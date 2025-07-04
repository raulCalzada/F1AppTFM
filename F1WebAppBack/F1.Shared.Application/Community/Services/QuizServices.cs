using System.Diagnostics.CodeAnalysis;
using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Database.Repositories.Quiz.Dtos;
using F1.Shared.Database.Repositories.Quiz.Interfaces;
using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Identity.Client;

namespace F1.Shared.Application.Community.Services;

public class QuizServices : IQuizServices
{
    private readonly IQuizzesRepository _quizzesRepository;
    private readonly IQuizQuestionsRepository _quizQuestionsRepository;
    private readonly IQuizAnswersRepository _quizAnswersRepository;
    private readonly IQuizResultsRepository _quizResultsRepository;

    public QuizServices(IQuizzesRepository quizzesRepository, IQuizQuestionsRepository quizQuestionsRepository,
                        IQuizAnswersRepository quizAnswersRepository, IQuizResultsRepository quizResultsRepository)
    {
        _quizzesRepository = quizzesRepository;
        _quizQuestionsRepository = quizQuestionsRepository;
        _quizAnswersRepository = quizAnswersRepository;
        _quizResultsRepository = quizResultsRepository;
    }

    public async Task AddUserResult(long quizId, IQuizResult quizResult)
    {
        await _quizResultsRepository.AddQuizResult(quizResult, quizId);
    }

    public async Task CreateQuiz(IQuiz quiz)
    {
        await _quizzesRepository.CreateQuiz(quiz);

        try
        {
            var quizCreated = await _quizzesRepository.GetQuizByTitle(quiz.Title) ?? throw new ArgumentException("Quiz creation failed");

            quiz.Id = quizCreated.Id;

            //creating the questions
            foreach (var quest in quiz.Questions)
            {
                await _quizQuestionsRepository.CreateQuizQuestion(quest, quiz.Id);
            }

            //validating if all questions were created successfully
            var questionsWithoutAnswersWithId = await _quizQuestionsRepository.GetAllQuizQuestionsByQuizId(quiz.Id);

            if (questionsWithoutAnswersWithId.Count() != quiz.Questions.Count())
            {
                await this.DeleteQuiz(quiz);
                throw new InvalidOperationException("Not all questions were created successfully");
            }

            //creating the answers
            foreach (var q in quiz.Questions)
            {
                q.Id = questionsWithoutAnswersWithId.FirstOrDefault(qw => qw.Text.Equals(q.Text))?.Id ?? throw new InvalidOperationException("Question not found");

                foreach (var ans in q.Answers)
                {
                    await _quizAnswersRepository.CreateQuizAnswer(ans, q.Id);
                }
            }

            quizCreated = await GetQuizById(quiz.Id) ?? throw new ArgumentException("Quiz creation failed");

            foreach (var q in quizCreated.Questions)
            {
                //pairing quiz recived with quiz the quiz created in the database
                var quizQuestion = quiz.Questions.First(quiz => quiz.Text.Equals(q.Text));
                //get correct answer for each question
                q.CorrectSelectedAnswerId = q.Answers.First(a => a.Text.Equals(quizQuestion.CorrectSelectedAnswer)).Id;

                await _quizQuestionsRepository.UpdateQuizQuestion(q, quiz.Id);
            }
        }

        catch (Exception ex)
        {
            await this.DeleteQuiz(quiz);
            throw new InvalidOperationException("An error occurred while creating the quiz", ex);
        }
    }

    public async Task DeleteQuiz(IQuiz quiz)
    {
        foreach(var question in quiz.Questions)
        {
            await _quizAnswersRepository.DeleteQuizAnswer(question.Id);
        }     
        await _quizQuestionsRepository.DeleteQuizQuestionsByQuizId(quiz.Id);
        await _quizResultsRepository.DeleteQuizResults(quiz.Id);
        await _quizzesRepository.DeleteQuiz(quiz.Id);
    }

    public async Task<IEnumerable<IQuiz>> GetAllQuizzes()
    {
        var quizzes = await _quizzesRepository.GetAllQuizzes();
        foreach (var quiz in quizzes)
        {
            quiz.UserResults = await _quizResultsRepository.GetQuizResultsByQuizId(quiz.Id);
        }
        return quizzes;
    }

    public async Task<IQuiz?> GetQuizById(long quizId)
    {
        //get quiz base
        var quiz = await _quizzesRepository.GetQuizById(quizId);

        if (quiz == null)
        {
            return null;
        }

        //get questions
        var questions = await _quizQuestionsRepository.GetAllQuizQuestionsByQuizId(quizId);
        if (questions == null || !questions.Any())
        {
            throw new ArgumentException("Quiz has no questions");
        }

        //get answers for each question
        foreach (var q in questions)
        {
            var answers = await _quizAnswersRepository.GetQuizAnswersByQuizQuestionId(q.Id);
            if (answers == null || !answers.Any())
            {
                throw new ArgumentException($"Question {q.Text} has no answers");
            }
            q.Answers = answers;

            //get correct answer for each question
            q.CorrectSelectedAnswer = answers.FirstOrDefault(a => a.Id.Equals(q.CorrectSelectedAnswerId))?.Text;
        }

        //get result from users
        var userResults = await _quizResultsRepository.GetQuizResultsByQuizId(quizId);

        // Map the results to the quiz
        quiz.UserResults = userResults;
        quiz.Questions = questions;

        return quiz;
    }

    public async Task<IQuiz?> GetQuizByTitle(string title)
    {
        var quiz = await _quizzesRepository.GetQuizByTitle(title);

        if (quiz == null)
        {
            return null;
        }

        //get questions
        var questions = await _quizQuestionsRepository.GetAllQuizQuestionsByQuizId(quiz.Id);
        if (questions == null || !questions.Any())
        {
            throw new ArgumentException("Quiz has no questions");
        }

        //get answers for each question
        foreach (var q in questions)
        {
            var answers = await _quizAnswersRepository.GetQuizAnswersByQuizQuestionId(q.Id);
            if (answers == null || !answers.Any())
            {
                throw new ArgumentException($"Question {q.Text} has no answers");
            }
            q.Answers = answers;
        }

        //map the results to the quiz
        quiz.Questions = questions;

        return quiz;
    }
}

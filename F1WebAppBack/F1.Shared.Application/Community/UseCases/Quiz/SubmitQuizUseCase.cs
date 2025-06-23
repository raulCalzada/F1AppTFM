using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Quiz.Interfaces;
using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz;

public class SubmitQuizUseCase : ISubmitQuizUseCase
{
    private readonly IQuizServices _quizServices;

    public SubmitQuizUseCase(IQuizServices quizServices)
    {
        _quizServices = quizServices;
    }

    public async Task<IQuiz> QuizSubmit(IQuiz quiz)
    {
        var originalQuiz = await _quizServices.GetQuizById(quiz.Id)
                           ?? throw new InvalidOperationException("Quiz not found");

        if (quiz.Questions.Count() != originalQuiz.Questions.Count())
        {
            throw new InvalidOperationException("Quiz questions count mismatch");
        }
        quiz.ScoreReceived = 0;

        var numberOfQuestions = originalQuiz.Questions.Count();
        
        if (originalQuiz.TotalScore == null || numberOfQuestions == 0)
        {
            throw new InvalidOperationException("Quiz total score or number of questions is not set");
        }

        var scorePerQuestion = originalQuiz.TotalScore / numberOfQuestions;

        foreach (var question in quiz.Questions)
        {
            var originalQuestion = originalQuiz.Questions.FirstOrDefault(q => q.Id.Equals(question.Id));

            if (originalQuestion == null)
            {
                throw new InvalidOperationException($"Question with ID {question.Id} not found in the original quiz");
            }

            if (originalQuestion.CorrectSelectedAnswer.Equals(question.CorrectSelectedAnswer))
            {
                quiz.ScoreReceived += scorePerQuestion;
            }
        }

        quiz.TotalScore = originalQuiz.TotalScore;
        
        await _quizServices.AddUserResult(quiz.Id, new QuizResult
        {
            User = quiz.UserResults.FirstOrDefault()?.User,
            ScoreObtained = quiz.ScoreReceived ?? 0
        });

        return quiz;
    }
}

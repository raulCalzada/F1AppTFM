using System;
using F1.Shared.Domain.Users.Entities;

namespace F1.CommunityService.Endpoints.Quiz.SubmitQuiz.Request;

public class SubmitQuizRequest
{
    public long QuizId { get; set; }
    public long UserId { get; set; }
    public List<long> QuestionIds { get; set; } = [];
    public List<string> Answers { get; set; } = [];

    public Shared.Domain.Comunity.Entities.Quiz ToDomain()
    {
        var questions = new List<Shared.Domain.Comunity.Entities.QuizQuestion>();

        if (QuestionIds.Count != Answers.Count)
        {
            throw new ArgumentException("The number of question IDs must match the number of answers.");
        }

        for(int i= 0; i < QuestionIds.Count; i++)
        {
            questions.Add(new Shared.Domain.Comunity.Entities.QuizQuestion
            {
                Id = QuestionIds[i],
                CorrectSelectedAnswer = Answers[i]
            });
        }

        return new Shared.Domain.Comunity.Entities.Quiz
        {
            Id = QuizId,
            Questions = questions,
            UserResults = new List<Shared.Domain.Comunity.Entities.QuizResult>
            {
                new Shared.Domain.Comunity.Entities.QuizResult
                {
                    User = new User { Id = UserId }
                }
            }
        };
    }
}

using System;
using F1.Shared.Domain.Users.Entities;

namespace F1.CommunityService.Endpoints.Quiz.SubmitQuiz.Request;

public class SubmitQuizRequest
{
    public long QuizId { get; set; }
    public long UserId { get; set; }
    public List<long> QuestionIds { get; set; } = [];
    public List<long> AnswersIds { get; set; } = [];

    public Shared.Domain.Comunity.Entities.Quiz ToDomain()
    {
        var questions = new List<Shared.Domain.Comunity.Entities.QuizQuestion>();

        if (QuestionIds.Count != AnswersIds.Count)
        {
            throw new ArgumentException("The number of question IDs must match the number of answers.");
        }

        for(int i= 0; i < QuestionIds.Count; i++)
        {
            questions.Add(new Shared.Domain.Comunity.Entities.QuizQuestion
            {
                Id = QuestionIds[i],
                CorrectSelectedAnswerId = AnswersIds[i]
            });
        }

        return new Shared.Domain.Comunity.Entities.Quiz
        {
            Id = QuizId,
            User = new User { Id = UserId },
        };
    }
}

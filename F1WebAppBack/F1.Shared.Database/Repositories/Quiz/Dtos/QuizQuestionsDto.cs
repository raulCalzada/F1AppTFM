using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz.Dtos;

public class QuizQuestionsDto
{
    public long Id { get; set; }
    public long QuizId { get; set; }
    public string Text { get; set; } = string.Empty;
    public long? CorrectAnswerId { get; set; }

    public IQuizQuestion ToDomain()
    {
        return new QuizQuestion()
        {
            Id = this.Id,
            Text = this.Text,
            CorrectSelectedAnswerId = CorrectAnswerId   
        };
    }
}

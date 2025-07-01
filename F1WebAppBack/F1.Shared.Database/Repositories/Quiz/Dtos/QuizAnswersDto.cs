using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz.Dtos;

public class QuizAnswersDto
{
    public long Id { get; set; }
    public long QuestionId { get; set; }
    public string Text { get; set; } = string.Empty;

    public IQuizAnswer ToDomain()
    {
        return new QuizAnswer
        {
            Id = this.Id,
            Text = this.Text,
        };
    }
}

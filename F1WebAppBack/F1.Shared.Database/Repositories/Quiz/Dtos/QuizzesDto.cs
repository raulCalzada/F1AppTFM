using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz.Dtos;

public class QuizzesDto
{
    public long Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public int? TotalScore { get; set; }

    public IQuiz ToDomain()
    {
        return new Domain.Comunity.Entities.Quiz()
        {
            Id = this.Id,
            Title = this.Title,
            Description = this.Subtitle,
            TotalScore = this.TotalScore
        };
    }
}

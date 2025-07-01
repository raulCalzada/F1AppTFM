using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;

namespace F1.Shared.Database.Repositories.Quiz.Dtos;

public class QuizResultsDto
{
    public long Id { get; set; }
    public long UserId { get; set; }
    public long QuizId { get; set; }
    public int ScoreObtained { get; set; }

    public IQuizResult ToDomain()
    {
        return new QuizResult
        {
            Id = this.Id,
            User = new User { Id = this.UserId },
            ScoreObtained = this.ScoreObtained
        };
    }
}

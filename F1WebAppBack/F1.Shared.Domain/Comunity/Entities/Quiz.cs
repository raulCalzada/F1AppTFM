using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;

namespace F1.Shared.Domain.Comunity.Entities;

public class Quiz : IQuiz
{
    public long Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int? TotalScore { get; set; }
    public int? ScoreReceived { get; set; }
    public User User { get; set; } = new User();
    public IEnumerable<IQuizQuestion> Questions { get; set; } = [];
    public IEnumerable<IQuizResult> UserResults { get; set; } = [];
}

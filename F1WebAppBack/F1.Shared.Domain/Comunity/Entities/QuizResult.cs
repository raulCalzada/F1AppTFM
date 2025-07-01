using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities;

public class QuizResult : IQuizResult
{
    public long Id { get; set; }
    public IUser User { get; set; } = default!;
    public int ScoreObtained{ get; set; }
}

using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities.Interfaces;

public interface IQuizResult
{
    long Id { get; set; }
    IUser User { get; set; }
    int ScoreObtained{ get; set; }
}

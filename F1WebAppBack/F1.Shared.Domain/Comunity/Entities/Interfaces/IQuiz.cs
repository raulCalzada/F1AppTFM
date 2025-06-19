namespace F1.Shared.Domain.Comunity.Entities.Interfaces;

public interface IQuiz
{
    long Id { get; set; }
    string Title { get; set; }
    string Description { get; set; }
    int? TotalScore { get; set; }
    int? ScoreReceived { get; set; }
    IEnumerable<IQuizQuestion> Questions { get; set; }
    IEnumerable<IQuizResult> UserResults { get; set; }
}

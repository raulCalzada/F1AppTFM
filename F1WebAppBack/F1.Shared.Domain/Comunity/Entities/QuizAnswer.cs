using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities;

public class QuizAnswer : IQuizAnswer
{
    public long Id { get; set; }
    public string Text { get; set; } = string.Empty;
}

using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities;

public class QuizQuestion : IQuizQuestion
{
    public long Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public IEnumerable<IQuizAnswer> Answers { get; set; } = [];
    public long? CorrectSelectedAnswerId { get; set; }
    public string CorrectSelectedAnswer { get; set; } = string.Empty;
    
    public bool IsCorrectAnswer(long answerId)
    {
        return answerId == CorrectSelectedAnswerId;
    }
}

namespace F1.Shared.Domain.Comunity.Entities.Interfaces;

public interface IQuizQuestion
{
    long Id { get; set; }
    string Text { get; set; }
    IEnumerable<IQuizAnswer> Answers { get; set; }
    long CorrectSelectedAnswerId { get; set; }
}

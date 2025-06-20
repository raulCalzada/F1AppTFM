using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz.Interfaces;

public interface IQuizResultsRepository
{
    Task<IEnumerable<IQuizResult>> GetQuizResultsByQuizId(long quizId);
    Task AddQuizResult(IQuizResult quizResult, long quizId);
    Task DeleteQuizResults(long quizId);
}

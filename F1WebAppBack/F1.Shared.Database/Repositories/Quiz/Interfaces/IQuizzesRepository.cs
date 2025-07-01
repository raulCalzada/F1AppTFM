using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz.Interfaces;

public interface IQuizzesRepository
{
    Task<IEnumerable<IQuiz>> GetAllQuizzes();
    Task<IQuiz?> GetQuizById(long id);
    Task<IQuiz?> GetQuizByTitle(string title);
    Task CreateQuiz(IQuiz quiz);
    Task DeleteQuiz(long id);
}

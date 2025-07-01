using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz.Interfaces;

public interface IGetAllQuizzesUseCase
{
    /// <summary>
    /// Retrieves all quizzes.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation, containing a list of quizzes.</returns>
    Task<IEnumerable<IQuiz>> GetAllQuizzesAsync();
}

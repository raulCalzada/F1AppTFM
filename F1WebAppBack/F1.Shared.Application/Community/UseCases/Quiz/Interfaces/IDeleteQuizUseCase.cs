using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz.Interfaces;

public interface IDeleteQuizUseCase
{
    /// <summary>
    /// Deletes a quiz by its identifier.
    /// </summary>
    /// <param name="quizId">The identifier of the quiz to delete.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<IQuiz> DeleteQuiz(long quizId);
}

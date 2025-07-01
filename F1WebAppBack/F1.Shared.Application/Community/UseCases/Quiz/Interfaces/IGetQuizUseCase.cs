using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz;

public interface IGetQuizUseCase
{
    Task<IQuiz> GetQuizAsync(long quizId);
}

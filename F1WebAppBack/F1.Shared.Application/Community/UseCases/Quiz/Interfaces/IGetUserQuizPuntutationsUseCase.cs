using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz;

public interface IGetUserQuizPuntutationsUseCase
{
    Task<IEnumerable<IQuiz>> GetUserQuizzes(long userId);
}

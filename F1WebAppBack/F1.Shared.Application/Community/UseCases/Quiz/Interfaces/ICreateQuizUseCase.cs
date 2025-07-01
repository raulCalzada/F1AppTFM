using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz.Interfaces;

public interface ICreateQuizUseCase
{
    Task<IQuiz> CreateQuiz(IQuiz quiz);
}

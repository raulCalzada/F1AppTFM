using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz.Interfaces;

public interface ISubmitQuizUseCase
{
    Task<IQuiz> QuizSubmit(IQuiz quiz);
}

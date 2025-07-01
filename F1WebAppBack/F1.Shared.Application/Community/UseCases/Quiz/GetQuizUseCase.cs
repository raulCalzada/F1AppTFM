using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz;

public class GetQuizUseCase : IGetQuizUseCase
{
    private readonly IQuizServices _quizServices;

    public GetQuizUseCase(IQuizServices quizServices)
    {
        _quizServices = quizServices;
    }

    public async Task<IQuiz> GetQuizAsync(long quizId)
    {
        return await _quizServices.GetQuizById(quizId) 
               ?? throw new InvalidOperationException("Quiz not found");
    }
}

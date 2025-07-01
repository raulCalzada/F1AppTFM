using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Quiz.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz;

public class GetAllQuizzesUseCase : IGetAllQuizzesUseCase
{
    private readonly IQuizServices _quizServices;

    public GetAllQuizzesUseCase(IQuizServices quizServices)
    {
        _quizServices = quizServices;
    }

    public Task<IEnumerable<IQuiz>> GetAllQuizzesAsync()
    {
        return _quizServices.GetAllQuizzes();
    }
}


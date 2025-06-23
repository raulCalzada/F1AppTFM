using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Quiz.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz;

class CreateQuizUseCase : ICreateQuizUseCase
{
    private readonly IQuizServices _quizServices;

    public CreateQuizUseCase(IQuizServices quizServices)
    {
        _quizServices = quizServices;
    }
    public async Task<IQuiz> CreateQuiz(IQuiz quiz)
    {
        var quizzes = await _quizServices.GetAllQuizzes();

        if (!quizzes.Any(q => q.Title.Equals(q.Title)))
        {
            throw new InvalidOperationException("Title already exists");
        }

        await _quizServices.CreateQuiz(quiz);

        var createdQuiz = await _quizServices.GetQuizByTitle(quiz.Title);

        if (createdQuiz == null)
        {
            throw new InvalidOperationException("Quiz creation failed");
        }   
        return createdQuiz;
    }
}

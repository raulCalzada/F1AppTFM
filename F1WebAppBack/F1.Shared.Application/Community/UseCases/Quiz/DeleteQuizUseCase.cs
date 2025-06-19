using System;
using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Quiz.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz;

public class DeleteQuizUseCase : IDeleteQuizUseCase
{
    private readonly IQuizServices _quizServices;

    public DeleteQuizUseCase(IQuizServices quizServices)
    {
        _quizServices = quizServices;
    }

    public async Task<IQuiz> DeleteQuiz(long quizId)
    {
        var quiz = await _quizServices.GetQuizById(quizId);
        if (quiz == null)
        {
            throw new InvalidOperationException("Quiz not found");
        }

        await _quizServices.DeleteQuiz(quizId);

        var deletedQuiz = await _quizServices.GetQuizById(quizId);

        if (deletedQuiz != null)
        {
            throw new InvalidOperationException("Quiz deletion failed");
        }

        return quiz;
    }
}

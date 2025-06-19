using System;
using System.Net;
using F1.Shared.Application.Community.UseCases.Quiz.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Quiz.DeleteQuiz;

public class DeleteQuizEndpoint : EndpointWithoutRequest
{
    private readonly IDeleteQuizUseCase _deleteQuizUseCase;

    public DeleteQuizEndpoint(IDeleteQuizUseCase deleteQuizUseCase)
    {
        _deleteQuizUseCase = deleteQuizUseCase;
    }

    public override void Configure()
    {
        Delete("/quiz/{QuizId}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var quizId = Route<long>("QuizId");
        var response = await _deleteQuizUseCase.DeleteQuiz(quizId);

        if (response == null)
        {
            await SendErrorsAsync();
            return;
        }
        else
        {
            await SendAsync(HttpStatusCode.NoContent);
        }

    }
}

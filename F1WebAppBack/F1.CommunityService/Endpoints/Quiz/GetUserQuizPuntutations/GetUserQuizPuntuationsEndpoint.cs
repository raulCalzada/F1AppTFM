using F1.CommunityService.Endpoints.Quiz.GetUserQuizPuntutations.Reponse;
using F1.Shared.Application.Community.UseCases.Quiz;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Quiz.GetUserQuizPuntutations;

public class GetUserQuizPuntuationsEndpoint : EndpointWithoutRequest
{
    private readonly IGetUserQuizPuntutationsUseCase _getUserQuizPuntuationsUseCase;

    public GetUserQuizPuntuationsEndpoint(IGetUserQuizPuntutationsUseCase getUserQuizPuntuationsUseCase)
    {
        _getUserQuizPuntuationsUseCase = getUserQuizPuntuationsUseCase;
    }

    public override void Configure()
    {
        Get("/quiz/user/{UserId}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = Route<long>("UserId");
        var response = await _getUserQuizPuntuationsUseCase.GetUserQuizzes(userId);

        if (response == null || !response.Any())
        {
            await SendErrorsAsync();
            return;
        }
        else
        {
            await SendOkAsync(response.Select(r => new GetUserQuizPuntuationsResponse(r)), ct);
        }
    }
}

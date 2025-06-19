using F1.CommunityService.Endpoints.Dtos;
using F1.Shared.Application.Community.UseCases.Quiz.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Quiz.GetAllQuizzes;

public class GetAllQuizzesEndpoint : EndpointWithoutRequest
{
    private readonly IGetAllQuizzesUseCase _getAllQuizzesUseCase;

    public GetAllQuizzesEndpoint(IGetAllQuizzesUseCase getAllQuizzesUseCase)
    {
        _getAllQuizzesUseCase = getAllQuizzesUseCase;
    }

    public override void Configure()
    {
        Get("/quiz");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var response = await _getAllQuizzesUseCase.GetAllQuizzesAsync();

        if (response == null || !response.Any())
        {
            await SendErrorsAsync();
            return;
        }
        await SendOkAsync(response.Select(q => new QuizDto(q)), ct);
    }
}

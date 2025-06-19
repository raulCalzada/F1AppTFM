using F1.CommunityService.Endpoints.Dtos;
using F1.Shared.Application.Community.UseCases.Quiz;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Quiz.GetQuiz;

public class GetQuizEndpoint : EndpointWithoutRequest
{
    private readonly IGetQuizUseCase _getQuizUseCase;

    public GetQuizEndpoint(IGetQuizUseCase getQuizUseCase)
    {
        _getQuizUseCase = getQuizUseCase;
    }

    public override void Configure()
    {
        Get("/quiz/{QuizId}");
        AllowAnonymous();
    }
    public override async Task HandleAsync(CancellationToken ct)
    {
        var quizId = Route<long>("QuizId");
        var response = await _getQuizUseCase.GetQuizAsync(quizId);

        if (response == null)
        {
            await SendErrorsAsync();
            return;
        }
        else
        {
            await SendOkAsync(new QuizDto(response), ct);
        }
    }
}

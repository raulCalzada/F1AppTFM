using F1.CommunityService.Endpoints.Dtos;
using F1.CommunityService.Endpoints.Quiz.CreateQuiz.Request;
using F1.Shared.Application.Community.UseCases.Quiz.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Quiz.CreateQuiz;

public class CreateQuizEndpoint : Endpoint<CreateQuizRequest>
{
    private readonly ICreateQuizUseCase _createQuizUseCase;

    public CreateQuizEndpoint(ICreateQuizUseCase createQuizUseCase)
    {
        _createQuizUseCase = createQuizUseCase;
    }

    public override void Configure()
    {
        Post("/quiz");
        AllowAnonymous();
    }

    public override async Task HandleAsync(CreateQuizRequest request, CancellationToken ct)
    {
        var response = await _createQuizUseCase.CreateQuiz(request.ToDomain());

        if (response == null)
        {
            await SendErrorsAsync();
            return;
        } else {
            await SendOkAsync(new QuizDto(response), ct);
        }
    }
}

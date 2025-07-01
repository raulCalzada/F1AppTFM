using F1.CommunityService.Endpoints.Quiz.SubmitQuiz.Request;
using F1.Shared.Application.Community.UseCases.Quiz.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Quiz.SubmitQuiz;

public class SubmitQuizEndpoint : Endpoint<SubmitQuizRequest>
{
    private readonly ISubmitQuizUseCase _submitQuizUseCase;
    public SubmitQuizEndpoint(ISubmitQuizUseCase submitQuizUseCase)
    {
        _submitQuizUseCase = submitQuizUseCase;
    }

    public override void Configure()
    {
        Post("/quiz/submit");
        AllowAnonymous();
    }

    public override async Task HandleAsync(SubmitQuizRequest request, CancellationToken ct)
    {
        var response = await _submitQuizUseCase.QuizSubmit(request.ToDomain());

        if (response == null)
        {
            await SendErrorsAsync();
            return;
        }
        else
        {
            var result = new
            {
                Score = response.TotalScore
            };
            await SendOkAsync(result, ct);
        }
    }
}

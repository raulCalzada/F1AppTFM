using F1.CommunityService.Endpoints.Dtos;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Voting.GetVoteById
{
    public class GetVotationByIdEndpoint : EndpointWithoutRequest
    {
        private readonly IGetVoteUseCase _getVoteUseCase;

        public GetVotationByIdEndpoint(IGetVoteUseCase getVoteUseCase)
        {
            _getVoteUseCase = getVoteUseCase;
        }

        public override void Configure()
        {
            Get("/vote/{QuestionId}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var questionId = Route<int>("QuestionId");
            var result = await _getVoteUseCase.GetCompleteVotation(questionId);
            if (result == null)
            {
                await SendErrorsAsync();
                return;
            }
            await SendOkAsync(new VoteQuestionWithAnswersDto(result), ct);
        }

    }
}

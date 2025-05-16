using F1.CommunityService.Endpoints.Dtos;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Voting.CreateVotation
{
    public class CreateVotationEndpoint : Endpoint<VoteQuestionDto>
    {
        private readonly ICreateVoteUseCase _createVoteUseCase;

        public CreateVotationEndpoint(ICreateVoteUseCase createVoteUseCase)
        {
            _createVoteUseCase = createVoteUseCase;
        }

        public override void Configure()
        {
            Post("/vote");
            AllowAnonymous();
        }

        public override async Task HandleAsync(VoteQuestionDto request, CancellationToken ct)
        {
            var result = await _createVoteUseCase.CreateCompleteVote(request.ToDomain());
            if (result == null)
            {
                await SendErrorsAsync();
                return;
            }
            await SendOkAsync(new VoteQuestionDto(result), ct);
        }
    }
}

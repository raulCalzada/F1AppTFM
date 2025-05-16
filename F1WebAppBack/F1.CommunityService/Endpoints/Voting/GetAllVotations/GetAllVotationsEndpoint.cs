using F1.CommunityService.Endpoints.Dtos;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Voting.GetAllVotes
{
    public class GetAllVotationsEndpoint : EndpointWithoutRequest
    {
        private readonly IGetAllVotesUseCase _getAllVotesUseCase;

        public GetAllVotationsEndpoint(IGetAllVotesUseCase getAllVotesUseCase)
        {
            _getAllVotesUseCase = getAllVotesUseCase;
        }

        public override void Configure()
        {
            Get("/votes");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var result = await _getAllVotesUseCase.GetVotes();
            if (result == null)
            {
                await SendErrorsAsync();
                return;
            }
            var response = result.Select(x => new VoteQuestionDto(x));
            await SendOkAsync(response, ct);
        }
    }
}

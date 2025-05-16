using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Voting.DeleteVotation
{
    public class DeleteVotationEndpoint : EndpointWithoutRequest
    {
        private readonly IDeleteVotationUseCase _deleteVotationUseCase;
        public DeleteVotationEndpoint(IDeleteVotationUseCase deleteVotationUseCase)
        {
            _deleteVotationUseCase = deleteVotationUseCase;
        }
        public override void Configure()
        {
            Delete("/vote/{VotationId}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(CancellationToken ct)
        {
            var votationId = Route<int>("VotationId");
            var response = await _deleteVotationUseCase.DeleteVoteQuestion(votationId);

            if (!response)
            {
                await SendErrorsAsync();
                return;
            }

            await SendNoContentAsync(ct);
        }
    }
}

using F1.CommunityService.Endpoints.Voting.GiveVotingPoints.Request;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Voting.GiveVotingPoints
{
    public class GiveVotingPointsEndpoint : Endpoint<GiveVotingPointsRequest>
    {
        private readonly IGiveVotingPointsUseCase _giveVotingPointsUseCase;

        public GiveVotingPointsEndpoint(IGiveVotingPointsUseCase giveVotingPointsUseCase)
        {
            _giveVotingPointsUseCase = giveVotingPointsUseCase;
        }

        public override void Configure()
        {
            Post("/vote/give-points");
            AllowAnonymous();
        }

        public override async Task HandleAsync(GiveVotingPointsRequest request, CancellationToken ct)
        {
            await _giveVotingPointsUseCase.GivePoints(request.Points, request.QuestionId, request.VoteOption);

            await SendNoContentAsync(ct);
        }
    }
}

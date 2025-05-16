using F1.CommunityService.Endpoints.Dtos;
using F1.CommunityService.Endpoints.Voting.ChangeVoteStatus.Request;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using F1.Shared.Domain.Comunity.Enums;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Voting.ChangeVoteStatus
{
    public class ChangeVoteStatusEndpoint : Endpoint<ChangeVoteStatusRequest>
    {
        private readonly IChangeVoteStatusUseCase _changeVoteStatusUseCase;

        public override void Configure()
        {
            Post("/vote/{QuestionId}/status");
            AllowAnonymous();
        }

        public override async Task HandleAsync(ChangeVoteStatusRequest request, CancellationToken ct)
        {
            var questionId = Route<int>("QuestionId");
            var result = await _changeVoteStatusUseCase.ChangeStatusOfVotation(questionId, (VotingStatus)request.Status);

            if (result == null)
            {
                await SendErrorsAsync();
                return;
            }

            await SendOkAsync(new VoteQuestionDto(result), ct);
        }
    }
}

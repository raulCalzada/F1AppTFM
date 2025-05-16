using F1.CommunityService.Endpoints.Dtos;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Voting.Vote
{
    public class VoteEndpoint : Endpoint<VoteDto>
    {
        private readonly IVoteUseCase _voteUseCase;

        public VoteEndpoint(IVoteUseCase voteUseCase)
        {
            _voteUseCase = voteUseCase;
        }

        public override void Configure()
        {
            Post("/vote/{QuestionId}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(VoteDto request, CancellationToken ct)
        {
            var questionId = Route<long>("QuestionId");

            var result = await _voteUseCase.Vote(questionId, request.VoteOptionId, request.UserId);

            if (result == null)
            {
                await SendErrorsAsync();
                return;
            }

            await SendOkAsync(new VoteQuestionDto(result), ct);
        }
    }
}

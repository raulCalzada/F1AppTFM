using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using F1.Shared.Application.User.Services.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Voting
{
    class GiveVotingPointsUseCase : IGiveVotingPointsUseCase
    {
        private readonly IVotingServices _votingServices;

        private readonly IUserService _userService;

        public GiveVotingPointsUseCase(IVotingServices votingServices, IUserService userService)
        {
            _votingServices = votingServices;
            _userService = userService;
        }

        public async Task GivePoints(long pointsToAdd, long questionId, int voteOption)
        {
            var votes = await _votingServices.GetVotesAndQuestion(questionId);

            if (votes == null)
            {
                throw new InvalidOperationException("Vote question not found");
            }

            foreach(var vote in votes.Votes.Where(v => v.Option.Equals(voteOption)))
            {
                var currentUserId = vote.User.Id;

                _ = _userService.GivePoints(currentUserId, pointsToAdd);
            }
        }
    }
}

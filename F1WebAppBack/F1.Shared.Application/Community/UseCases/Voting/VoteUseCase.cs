using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Voting
{
    class VoteUseCase : IVoteUseCase
    {
        private readonly IVotingServices _votingServices;
        private readonly IGetVoteUseCase _getVoteUseCase;

        public VoteUseCase(IVotingServices votingServices, IGetVoteUseCase getVoteUseCase)
        {
            _votingServices = votingServices;
            _getVoteUseCase = getVoteUseCase;
        }

        public async Task<IVoteQuestion> Vote(long questionId, int option, long userId)
        {
            var votes = await _votingServices.GetVotesAndQuestion(questionId);

            if (votes == null)
            {
                throw new InvalidOperationException("Vote question not found");
            }

            if(votes.Votes.Any(v => v.User.Id.Equals(userId)))
            {
                throw new InvalidOperationException("User already voted");
            }

            await _votingServices.Vote(questionId, userId, option);

            return await _getVoteUseCase.GetCompleteVotation(questionId);
        }
    }
}

using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.Shared.Application.Community.UseCases.Voting
{
    class ChangeVoteStatusUseCase : IChangeVoteStatusUseCase
    {
        private readonly IVotingServices _votingServices;

        public ChangeVoteStatusUseCase(IVotingServices votingServices)
        {
            _votingServices = votingServices;
        }

        public async Task<IVoteQuestion?> ChangeStatusOfVotation(long questionId, VotingStatus state)
        {
            var voteQuestion = await _votingServices.GetVotesAndQuestion(questionId);

            if (voteQuestion == null)
            {
                throw new InvalidOperationException("Vote question not found");
            }

            if (voteQuestion.State.Equals(state))
            {
                return voteQuestion;
            }

            await _votingServices.ChangeVoteStatus(questionId, state);

            voteQuestion = await _votingServices.GetVotesAndQuestion(questionId);

            if (voteQuestion!.State.Equals(state))
            {
                return voteQuestion;
            }

            return null;
        }
    }
}

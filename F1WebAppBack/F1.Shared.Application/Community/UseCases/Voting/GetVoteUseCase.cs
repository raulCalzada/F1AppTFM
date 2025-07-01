using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Voting
{
    class GetVoteUseCase : IGetVoteUseCase
    {
        private readonly IVotingServices _votingServices;

        public GetVoteUseCase(IVotingServices votingServices)
        {
            _votingServices = votingServices;
        }

        public async Task<IVoteQuestion> GetCompleteVotation(long questionId)
        {
            var voteQuestion = await _votingServices.GetVotesAndQuestion(questionId);

            if (voteQuestion == null)
            {
                throw new InvalidOperationException("Vote question not found");
            }

            if (voteQuestion.Options == null || !voteQuestion.Options.Any())
            {
                throw new InvalidOperationException("Vote options cannot be empty");
            }

            return voteQuestion;
        }
    }
}

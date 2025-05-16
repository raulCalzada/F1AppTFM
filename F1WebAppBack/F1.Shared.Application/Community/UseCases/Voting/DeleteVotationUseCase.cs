using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Voting
{
    class DeleteVotationUseCase : IDeleteVotationUseCase
    {
        private readonly IVotingServices _votingServices;

        public DeleteVotationUseCase(IVotingServices votingServices)
        {
            _votingServices = votingServices;
        }

        public async Task<bool> DeleteVoteQuestion(long questionId)
        {
            var voteQuestion = await _votingServices.GetVotesAndQuestion(questionId);

            if (voteQuestion == null)
            {
                throw new InvalidOperationException("Vote question not found");
            }

            await _votingServices.DeleteVotesAndQuestion(voteQuestion);

            var voteQuestionDeleted = await _votingServices.GetVotesAndQuestion(questionId);

            if (voteQuestionDeleted == null)
            {
                return true;
            }

            return false;
        }
    }
}

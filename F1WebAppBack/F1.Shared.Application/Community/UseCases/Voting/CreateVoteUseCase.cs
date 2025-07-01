using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Voting
{
    class CreateVoteUseCase : ICreateVoteUseCase
    {
        private readonly IVotingServices _votingServices;

        public CreateVoteUseCase(IVotingServices votingServices)
        {
            _votingServices = votingServices;
        }

        public async Task<IVoteQuestion?> CreateCompleteVote(IVoteQuestion voteQuestion)
        {
            if (voteQuestion == null)
            {
                throw new ArgumentNullException(nameof(voteQuestion), "Vote question cannot be null");
            }
            if (string.IsNullOrWhiteSpace(voteQuestion.Question))
            {
                throw new ArgumentException("Vote question cannot be empty", nameof(voteQuestion));
            }
            if (voteQuestion.Options == null || !voteQuestion.Options.Any())
            {
                throw new ArgumentException("Vote options cannot be empty", nameof(voteQuestion));
            }

            var questionId = await _votingServices.CreateVote(voteQuestion);

            return await _votingServices.GetVotesAndQuestion(questionId);
        }
    }
}

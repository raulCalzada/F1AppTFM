using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Voting
{
    class GetAllVotesUseCase : IGetAllVotesUseCase
    {
        private readonly IVotingServices _votingServices;

        public GetAllVotesUseCase(IVotingServices votingServices)
        {
            _votingServices = votingServices;
        }

        public async Task<IEnumerable<IVoteQuestion>> GetVotes()
        {
            var votes = await _votingServices.GetAllVoteQuestions();

            if (votes == null)
            {
                return null;
            }

            foreach (var vote in votes)
            {
                vote.Votes = await _votingServices.GetVotes(vote.Id);
            }

            return votes;
        }
    }
}

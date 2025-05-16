using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.Shared.Application.Community.Services.Interfaces
{
    interface IVotingServices
    {
        Task Vote(long questionId, long userId, int option);
        Task CreateVote(IVoteQuestion voteQ);
        Task ChangeVoteStatus(long questionId, VotingStatus state);
        Task<IEnumerable<IVote>> GetVotes(long questionId);
        Task<IEnumerable<IVoteQuestion>> GetAllVoteQuestions();
        Task<IVoteQuestion?> GetVotesAndQuestion(long questionId);
        Task DeleteVotesAndQuestion(IVoteQuestion voteQ);
    }
}

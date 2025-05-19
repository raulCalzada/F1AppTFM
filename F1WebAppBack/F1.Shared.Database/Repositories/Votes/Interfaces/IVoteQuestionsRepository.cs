using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.Shared.Database.Repositories.Votes.Interfaces
{
    public interface IVoteQuestionsRepository
    {
        Task<long> CreateVoteQuestion(string question, IEnumerable<string> options, VotingStatus status);
        Task<IVoteQuestion?> GetVoteQuestion(long questionId);
        Task DeleteVoteQuestion(long questionId);
        Task<IEnumerable<IVoteQuestion>> GetAllVoteQuestions();
        Task ChangeVoteStatus(long questionId, VotingStatus state);

    }
}

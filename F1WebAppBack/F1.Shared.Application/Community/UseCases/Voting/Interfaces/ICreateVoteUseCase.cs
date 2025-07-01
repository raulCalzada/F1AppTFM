using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Voting.Interfaces
{
    public interface ICreateVoteUseCase
    {
        Task<IVoteQuestion?> CreateCompleteVote(IVoteQuestion voteQuestion);
    }
}

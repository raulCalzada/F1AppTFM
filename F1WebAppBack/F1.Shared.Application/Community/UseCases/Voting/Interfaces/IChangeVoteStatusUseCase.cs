using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.Shared.Application.Community.UseCases.Voting.Interfaces
{
    public interface IChangeVoteStatusUseCase
    {
        Task<IVoteQuestion?> ChangeStatusOfVotation(long questionId, VotingStatus state);
    }
}

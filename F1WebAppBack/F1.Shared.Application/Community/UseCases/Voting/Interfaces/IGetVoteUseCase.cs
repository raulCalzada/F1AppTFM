using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Voting.Interfaces
{
    public interface IGetVoteUseCase
    {
        Task<IVoteQuestion> GetCompleteVotation(long questionId);
    }
}

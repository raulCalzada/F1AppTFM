namespace F1.Shared.Application.Community.UseCases.Voting.Interfaces
{
    public interface IDeleteVotationUseCase
    { 
        Task <bool> DeleteVoteQuestion(long questionId);
    }
}

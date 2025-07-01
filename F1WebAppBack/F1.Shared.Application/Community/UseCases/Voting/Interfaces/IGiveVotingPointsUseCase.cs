namespace F1.Shared.Application.Community.UseCases.Voting.Interfaces
{
    public interface IGiveVotingPointsUseCase
    {
        Task GivePoints(long pointsToAdd, long questionId, int voteOption);
    }
}

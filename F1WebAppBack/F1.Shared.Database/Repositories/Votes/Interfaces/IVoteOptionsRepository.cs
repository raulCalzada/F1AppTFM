namespace F1.Shared.Database.Repositories.Votes.Interfaces
{
    public interface IVoteOptionsRepository
    {
        Task CreateVoteOption(long questionId, int option, string optionText);
        Task DeleteVoteOption(long questionId, int option);
        Task<IEnumerable<string>> GetVoteOptions(long questionId);
    }
}

using F1.Shared.Domain.Comunity.Enums;

namespace F1.Shared.Domain.Comunity.Entities.Interfaces
{
    public interface IVoteQuestion
    {
        public long Id { get; set; }
        public string Question { get; set; }
        public DateTime? CreateDate { get; set; }
        public VotingStatus State { get; set; }
        public IEnumerable<string> Options { get; set; }
        public IEnumerable<IVote> Votes { get; set; }
    }
}

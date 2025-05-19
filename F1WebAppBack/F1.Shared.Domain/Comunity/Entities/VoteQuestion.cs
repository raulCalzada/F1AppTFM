using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.Shared.Domain.Comunity.Entities
{
    public class VoteQuestion : IVoteQuestion
    {
        public long Id { get; set; }
        public string Question { get; set; } = string.Empty;
        public DateTime? CreateDate { get; set; }
        public VotingStatus State { get; set; } = VotingStatus.Inactive;
        public IEnumerable<string> Options { get; set; } = [];
        public IEnumerable<IVote> Votes { get; set; } = [];
    }
}

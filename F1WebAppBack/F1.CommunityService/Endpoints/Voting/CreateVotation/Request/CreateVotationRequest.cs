using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.CommunityService.Endpoints.Voting.CreateVotation.Request
{
    public class CreateVotationRequest
    {
        public string Question { get; set; } = string.Empty;
        public int Status { get; set; }
        public List<string> Options { get; set; } = [];

        public IVoteQuestion ToDomain()
        {
            return new VoteQuestion
            {
                Question = Question,
                State = (VotingStatus)Status,
                Options = Options,
            };
        }
    }
}

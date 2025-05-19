using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.CommunityService.Endpoints.Dtos
{
    public class VoteDto
    {
        public int VoteOption { get; set; }
        public long UserId { get; set; }

        public VoteDto(IVote vote)
        {
            VoteOption = vote.Option;
            UserId = vote.User.Id;
        }
    }
}

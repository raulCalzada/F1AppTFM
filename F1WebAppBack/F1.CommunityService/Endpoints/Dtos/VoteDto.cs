using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Users.Entities;

namespace F1.CommunityService.Endpoints.Dtos
{
    public class VoteDto
    {
        public int VoteOptionId { get; set; }
        public long UserId { get; set; }

        public IVote ToDomain()
        {
            return new Vote
            {
                Option = VoteOptionId,
                User = new User { Id = UserId }
            };
        }
    }
}

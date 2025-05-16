using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;
using System;

namespace F1.Shared.Database.Repositories.Votes.Dtos
{
    public class VotesDto
    {
        public int Id { get; set; }
        public int VoteOptionId { get; set; }
        public int UserId { get; set; }

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
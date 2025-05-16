using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;
using System;

namespace F1.Shared.Database.Repositories.Votes.Dtos
{
    public class VotesDto
    {
        public int Id { get; set; }
        public int OptionNumber { get; set; }
        public int UserId { get; set; }

        public IVote ToDomain()
        {
            return new Vote
            {
                Option = OptionNumber,
                User = new User { Id = UserId }
            };
        }
    }
}
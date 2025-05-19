using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.Shared.Database.Repositories.Votes.Dtos
{
    public class VoteQuestionsDto
    {
        public int Id { get; set; }
        public string Question { get; set; } = string.Empty;
        public string CreateDate { get; set; } = string.Empty;
        public int State { get; set; }

        public IVoteQuestion ToDomain()
        {
            return new VoteQuestion
            {
                Id = Id,
                Question = Question,
                CreateDate = DateTime.TryParse(CreateDate, out var dt) ? dt : null,
                State = (VotingStatus)State,
                Options = new List<string>(),
            };

        }
    }
}

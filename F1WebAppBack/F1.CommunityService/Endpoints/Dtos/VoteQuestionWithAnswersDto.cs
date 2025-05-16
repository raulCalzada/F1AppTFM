using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.CommunityService.Endpoints.Dtos
{
    public class VoteQuestionWithAnswersDto
    {
        public long Id { get; set; }
        public string Question { get; set; } = string.Empty;
        public int Status { get; set; }
        public List<string> Options { get; set; } = [];
        public List<VoteDto> Votes { get; set; } = [];

        public IVoteQuestion ToDomain()
        {
            return new VoteQuestion
            {
                Id = Id,
                Question = Question,
                State = (VotingStatus)Status,
                Options = Options,
                Votes = Votes.Select(v => v.ToDomain()).ToList(),
            };
        }

        public VoteQuestionWithAnswersDto(IVoteQuestion voteQuestion)
        {
            Id = voteQuestion.Id;
            Question = voteQuestion.Question;
            Status = (int)voteQuestion.State;
            Options = voteQuestion.Options.ToList();
            Votes = voteQuestion.Votes.Select(v => new VoteDto
            {
                VoteOptionId = v.Option,
                UserId = v.User.Id
            }).ToList();
        }
    }
}

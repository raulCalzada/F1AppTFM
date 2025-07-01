using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.CommunityService.Endpoints.Dtos
{
    public class VoteQuestionDto
    {
        public long Id { get; set; }
        public string Question { get; set; }
        public int Status { get; set; }
        public string StatusDescr { set; get; }
        public List<string> Options { get; set; }

        public IVoteQuestion ToDomain()
        {
            return new VoteQuestion
            {
                Question = Question,
                State = (VotingStatus)Status,
                Options = Options,
            };
        }

        public VoteQuestionDto(IVoteQuestion question)
        {
            Id = question.Id;
            Question = question.Question;
            Status = (int)question.State;
            StatusDescr = question.State.ToString();
            Options = question.Options.ToList();

        }
    }
}

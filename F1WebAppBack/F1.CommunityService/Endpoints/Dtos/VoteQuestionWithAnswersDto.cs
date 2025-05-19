using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.CommunityService.Endpoints.Dtos
{
    public class VoteQuestionWithAnswersDto
    {
        public long Id { get; set; }
        public string Question { get; set; } = string.Empty;
        public int Status { get; set; }
        public List<string> Options { get; set; } = [];
        public List<VoteDto> Votes { get; set; } = [];

        public VoteQuestionWithAnswersDto(IVoteQuestion voteQuestion)
        {
            Id = voteQuestion.Id;
            Question = voteQuestion.Question;
            Status = (int)voteQuestion.State;
            Options = voteQuestion.Options.ToList();
            Votes = voteQuestion.Votes.Select(v => new VoteDto(v)).ToList();
        }
    }
}

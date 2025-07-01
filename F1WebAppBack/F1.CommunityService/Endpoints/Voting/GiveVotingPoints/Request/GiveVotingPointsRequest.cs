namespace F1.CommunityService.Endpoints.Voting.GiveVotingPoints.Request
{
    public class GiveVotingPointsRequest
    {
        public long QuestionId { get; set; }
        public int VoteOption { get; set; }
        public long Points { get; set; }
    }
}

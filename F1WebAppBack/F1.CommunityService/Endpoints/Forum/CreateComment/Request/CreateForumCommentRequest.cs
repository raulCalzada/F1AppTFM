namespace F1.CommunityService.Endpoints.Forum.CreateComment.Request
{
    public class CreateForumCommentRequest
    {
        public string Content { get; set; } = string.Empty;
        public int ThreadId { get; set; }
        public long UserId { get; set; }
    }
}

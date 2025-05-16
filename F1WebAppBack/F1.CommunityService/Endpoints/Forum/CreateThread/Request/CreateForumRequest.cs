namespace F1.CommunityService.Endpoints.Forum.CreateThread.Request
{
    public class CreateForumRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public long UserId { get; set; }
    }
}

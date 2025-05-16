using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;

namespace F1.CommunityService.Endpoints.Dtos
{
    public class ForumThreadDto
    {
        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public long UserId { get; set; }
        public IEnumerable<ForumCommentDto> Comments { get; set; } = [];

        public IForum ToDomain()
        {
            return new Shared.Domain.Comunity.Entities.Forum
            {
                Id = Id,
                Title = Title,
                Description = Description,
                User = new User { Id = UserId},
                Comments = Comments.Select(c => c.ToDomain()).ToList(),
            };
        }

        public ForumThreadDto(IForum forum)
        {
            Id = forum.Id;
            Title = forum.Title;
            Description = forum.Description;
            UserId = forum.User.Id;
            Comments = forum.Comments.Select(c => new ForumCommentDto(c)).ToList();
        }
    }
}

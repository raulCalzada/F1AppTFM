using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;
using F1.Shared.Domain.Users.Entities.Interfaces;
using System.Globalization;

namespace F1.CommunityService.Endpoints.Dtos
{
    public class ForumCommentDto
    {
        public long Id { get; set; }
        public string Comment { get; set; } = string.Empty;
        public string CreateDate { get; set; } = string.Empty;
        public long UserId { get; set; }

        public IForumComment ToDomain()
        {
            return new ForumComment
            {
                Id = Id,
                Comment = Comment,
                CreateDate = DateTime.TryParseExact(CreateDate, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var cDate) ? cDate : null,
                User = new User { Id = UserId},
            };
        }

        public ForumCommentDto(IForumComment forumComment) 
        {
            Id = forumComment.Id;
            Comment = forumComment.Comment;
            CreateDate = forumComment.CreateDate?.ToString("dd/MM/yyyy HH:mm:ss");
            UserId = forumComment.User.Id;
        }
    }
}

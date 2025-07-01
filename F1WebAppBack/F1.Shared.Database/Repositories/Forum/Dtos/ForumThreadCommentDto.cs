using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;

namespace F1.Shared.Database.Repositories.Forum.Dtos
{
    public class ForumThreadCommentDto
    {
        public long Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public int AuthorUserId { get; set; }
        public int ThreadId { get; set; }
        public DateTime CreateDate { get; set; }

        public IForumComment ToDomain()
        {
            return new Domain.Comunity.Entities.ForumComment
            {
                Id = Id,
                Comment = Content,
                User = new User { Id = AuthorUserId },
                CreateDate = CreateDate
            };
        }
    }
}

using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;

namespace F1.Shared.Database.Repositories.Forum.Dtos
{
    public class ForumThreadDto
    {
        public int ThreadId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int AuthorUserId { get; set; }
        public DateTime CreateDate { get; set; }

        public IForum ToDomain()
        {
            return new Domain.Comunity.Entities.Forum
            {
                Id = ThreadId,
                Title = Title,
                Description = Content,
                User = new User { Id = AuthorUserId },
                CreateDate = CreateDate,
            };
        }
    }
}

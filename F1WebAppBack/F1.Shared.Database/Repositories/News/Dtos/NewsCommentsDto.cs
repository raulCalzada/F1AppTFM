using F1.Shared.Domain.News.Entities;
using F1.Shared.Domain.News.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;
using System.Globalization;

namespace F1.Shared.Database.Repositories.News.Dtos
{
    public class NewsCommentsDto
    {
        public long CommentId { get; set; }
        public int UserId { get; set; }
        public int ArticleId { get; set; }
        public string Comment { get; set; } = string.Empty;
        public string CreateDate { get; set; } = string.Empty;

        public IArticleComment ToDomain()
        {
            return new ArticleComment
            {
                Id = CommentId,
                User = new User { Id = UserId },
                Comment = Comment,
                CreateDate = DateTime.TryParse(CreateDate, CultureInfo.InvariantCulture, DateTimeStyles.None, out var createDate) ? createDate : null
            };
        }
    }
}

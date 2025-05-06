using F1.Shared.Domain.News.Entities;
using F1.Shared.Domain.News.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;
using System.Globalization;

namespace F1.News.CommonDtos
{
    public class CommentRequest
    {
        public string Comment { get; set; } = string.Empty;
        public string? CreateDate { get; set; }
        public int UserId { get; set; }

        public IArticleComment ToDomain()
        {
            return new ArticleComment
            {
                Comment = Comment,
                CreateDate = DateTime.TryParseExact(CreateDate, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var cDate) ? cDate : null,
                User = new User { Id = UserId }
            };
        }
    }
}
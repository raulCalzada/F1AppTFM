using F1.Shared.Domain.News.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.News.Entities
{
    public class ArticleComment : IArticleComment
    {
        public long Id { get; set; }
        public IUser User { get; set; } = null!;
        public string Comment { get; set; } = string.Empty;
        public DateTime? CreateDate { get; set; }
    }
}

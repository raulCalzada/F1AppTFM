using F1.Shared.Domain.News.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.News.Entities
{
    public class New : INew
    {
        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ImageUrl1 { get; set; } = string.Empty;
        public string ImageUrl2 { get; set; } = string.Empty;
        public IUser Author { get; set; } = null!;
        public DateTime? CreateDate { get; set; }
        public IEnumerable<IArticleComment> Comments { get; set; } = null!;
    }
}

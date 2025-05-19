using F1.Shared.Domain.News.Entities;
using F1.Shared.Domain.News.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;
using System.Globalization;

namespace F1.Shared.Database.Repositories.News.Dtos
{
    public class NewsDto
    {
        public int ArticleId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? ImageUrl1 { get; set; }
        public string? ImageUrl2 { get; set; }
        public int AuthorUserId { get; set; }
        public string CreateDate { get; set; } = string.Empty;

        public INew ToDomain()
        {
            return new New
            {
                Id = ArticleId,
                Title = Title,
                Subtitle = Subtitle,
                Content = Content,
                ImageUrl1 = ImageUrl1 ?? string.Empty,
                ImageUrl2 = ImageUrl2 ?? string.Empty,
                Author = new User { Id = AuthorUserId },
                CreateDate = DateTime.TryParse(CreateDate, CultureInfo.InvariantCulture, DateTimeStyles.None, out var createDate) ? createDate : null
            };
        }
    }
}

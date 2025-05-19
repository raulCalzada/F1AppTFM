using F1.Shared.Domain.News.Entities;
using F1.Shared.Domain.News.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;

namespace F1.News.CommonDtos
{
    public class NewRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ImageUrl1 { get; set; } = string.Empty;
        public string ImageUrl2 { get; set; } = string.Empty;
        public long AuthorId { get; set; }

        public INew ToDomain()
        {
            return new New
            {
                Title = Title,
                Subtitle = Subtitle,
                Content = Content,
                ImageUrl1 = ImageUrl1,
                ImageUrl2 = ImageUrl2,
                Author = new User { Id = AuthorId},
            };
        }
    }
}

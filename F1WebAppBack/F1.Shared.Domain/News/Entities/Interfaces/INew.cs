using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.News.Entities.Interfaces
{
    public interface INew
    {
        long Id { get; set; }
        string Title { get; set; }
        string Subtitle { get; set; }
        string Content { get; set; }
        string ImageUrl1 { get; set; }
        string ImageUrl2 { get; set; }
        IUser Author { get; set; }
        DateTime? CreateDate { get; set; }
        IEnumerable<IArticleComment> Comments { get; set; }
    }
}

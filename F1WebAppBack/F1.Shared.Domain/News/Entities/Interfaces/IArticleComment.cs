using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.News.Entities.Interfaces
{
    public interface IArticleComment
    {
        long Id { get; set; }
        IUser User { get; set; }
        string Comment { get; set; }
        DateTime? CreateDate { get; set; }
    }
}

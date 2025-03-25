using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.News.Interfaces
{
    public interface INewsCommentsRepository
    {
        Task<IEnumerable<IArticleComment>> GetCommentsByArticleId(long articleId);
        Task CreateComment(IArticleComment comment, long articleId);
        Task UpdateComment(IArticleComment comment, long articleId);
        Task DeleteComment(long commentId);
    }
}

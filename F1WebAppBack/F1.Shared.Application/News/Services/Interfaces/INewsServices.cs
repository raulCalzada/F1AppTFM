using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.Services.Interfaces
{
    public interface INewsServices
    {
        /// <summary>
        /// Get all news without comments
        /// </summary>
        /// <param name="number"></param>
        /// <returns></returns>
        Task<IEnumerable<INew>> GetNews(int? number = null);

        /// <summary>
        /// Get all news with comments and user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<INew?> GetCompleteNewById(long id);

        /// <summary>
        /// Create a new
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        Task CreateNew(INew news);

        /// <summary>
        /// Update a new
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteNew(long id);

        /// <summary>
        /// Update a new
        /// </summary>
        /// <param name="news"></param>
        /// <returns></returns>
        Task UpdateNew(INew news);

        /// <summary>
        /// Get all comments from a new
        /// </summary>
        /// <param name="articleId"></param>
        /// <returns></returns>
        Task<IEnumerable<IArticleComment>> GetArticleCommentsByNewId(long articleId);

        /// <summary>
        /// Create a comment in a new
        /// </summary>
        /// <param name="comment"></param>
        /// <param name="articleId"></param>
        /// <returns></returns>
        Task CreateArticleComment(IArticleComment comment, long articleId);

        /// <summary>
        /// Update a comment from a new
        /// </summary>
        /// <param name="comment"></param>
        /// <returns></returns>
        Task UpdateArticleComment(IArticleComment comment);

        /// <summary>
        /// Delete a comment from a new
        /// </summary>
        /// <param name="commentId"></param>
        /// <returns></returns>
        Task DeleteArticleComment(long commentId);

    }
}

using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Database.Repositories.News.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.Services
{
    class NewsServices : INewsServices
    {
        private readonly INewsRespository _newsRespository;

        private readonly INewsCommentsRepository _newsCommentsRepository;

        public NewsServices(INewsRespository newsRespository, INewsCommentsRepository newsCommentsRepository)
        {
            _newsRespository = newsRespository;
            _newsCommentsRepository = newsCommentsRepository;
        }

        public async Task CreateArticleComment(IArticleComment comment, long articleId)
        {
            await _newsCommentsRepository.CreateComment(comment, articleId);
        }

        public async Task CreateNew(INew news)
        {
            await _newsRespository.CreateNew(news);
        }

        public async Task DeleteArticleComment(long commentId)
        {
            await _newsCommentsRepository.DeleteComment(commentId);
        }

        public async Task DeleteNew(long id)
        {
            await _newsRespository.DeleteNew(id);
        }

        public async Task<IEnumerable<IArticleComment>> GetArticleCommentsByNewId(long articleId)
        {
            return await _newsCommentsRepository.GetCommentsByArticleId(articleId);
        }

        public async Task<INew?> GetCompleteNewById(long id)
        {
            var article = await _newsRespository.GetNewById(id);

            if (article == null)
            {
                return null;
            }

            article.Comments = await GetArticleCommentsByNewId(id);

            return article;
        }

        public Task<IEnumerable<INew>> GetNews(int? number = null)
        {
            return _newsRespository.GetLastNews(number);
        }

        public Task UpdateArticleComment(IArticleComment comment, long articleId)
        {
            return _newsCommentsRepository.UpdateComment(comment, articleId);
        }

        public Task UpdateNew(INew news)
        {
            return _newsRespository.UpdateNew(news);
        }
    }
}

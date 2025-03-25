using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.News.Dtos;
using F1.Shared.Database.Repositories.News.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;
using System.Data;

namespace F1.Shared.Database.Repositories.News
{
    class NewsCommentsRepository : INewsCommentsRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public NewsCommentsRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task<IEnumerable<IArticleComment>> GetCommentsByArticleId(long articleId)
        {
            var newsDtoList = await _storeProcedureRepository.QueryAsync<NewsCommentsDto>($"SELECT * FROM NewsComments WHERE ArticleId = {articleId}", commandType: CommandType.Text);
            return newsDtoList.Select(x => x.ToDomain()).ToList();
        }

        public async Task CreateComment(IArticleComment comment, long articleId)
        {
            var commentDto = new
            {
                UserId = comment.User.Id,
                ArticleId = articleId,
                Comment = comment.Comment,
                CreateDate = comment.CreateDate
            };
            await _storeProcedureRepository.ExecuteAsync("CreateComment", commentDto, CommandType.StoredProcedure);
        }

        public async Task UpdateComment(IArticleComment comment, long articleId)
        {
            var commentDto = new
            {
                CommentId = comment.CommentId,
                UserId = comment.User.Id,
                ArticleId = articleId,
                Comment = comment.Comment,
                CreateDate = comment.CreateDate
            };
            await _storeProcedureRepository.ExecuteAsync("UpdateComment", commentDto, CommandType.StoredProcedure);
        }

        public async Task DeleteComment(long commentId)
        {
            await _storeProcedureRepository.ExecuteAsync($"DELETE FROM NewsComments WHERE CommentId = {commentId}", commandType: CommandType.Text);
        }
    }
}

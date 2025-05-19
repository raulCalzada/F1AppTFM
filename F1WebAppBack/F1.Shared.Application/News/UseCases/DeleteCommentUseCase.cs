using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases.Interfaces;

namespace F1.Shared.Application.News.UseCases
{
    class DeleteCommentUseCase : IDeleteCommentUseCase
    {
        private readonly INewsServices _newsServices;
        public DeleteCommentUseCase (INewsServices newsServices)
        {
            _newsServices = newsServices;
        }

        public async Task<bool> DeleteComment(long commentId, long articleId)
        {
            var article = await _newsServices.GetCompleteNewById(articleId);

            if (article == null)
            {
                throw new InvalidOperationException("New not found");
            }

            // Check if the comment exists
            if (!article.Comments.Any(c => c.Id == commentId))
            {
                throw new InvalidOperationException("Comment not found");
            }

            await _newsServices.DeleteArticleComment(commentId);

            article = await _newsServices.GetCompleteNewById(articleId);

            if (article == null)
            {
                throw new InvalidOperationException("New not found");
            }

            // Check if the comment was deleted
            if (!article.Comments.Any())
            {
                return true;
            }

            return !(article.Comments.Contains(article.Comments.FirstOrDefault(c => c.Id == commentId)));
        }

    }
}

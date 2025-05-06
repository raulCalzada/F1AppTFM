using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases
{
    public class UpdateCommentUseCase : IUpdateCommentUseCase
    {
        private readonly INewsServices _newsServices;

        public UpdateCommentUseCase(INewsServices newsServices)
        {
            _newsServices = newsServices;
        }

        public async Task<bool> EditComment(IArticleComment articleComment, long newId)
        {
            var article = await _newsServices.GetCompleteNewById(newId);

            if (article == null)
            {
                throw new InvalidOperationException("New not found");
            }

            // Check if the comment exists
            if (!article.Comments.Any(c => c.Id == articleComment.Id))
            {
                throw new InvalidOperationException("Comment not exists for this new");
            }

            await _newsServices.UpdateArticleComment(articleComment);

            // Check if the comment was updated
            var articleUpdated = await _newsServices.GetCompleteNewById(newId);

            if (articleUpdated == null)
            {
                throw new InvalidOperationException("New not found");
            }

            var updatedComment = articleUpdated.Comments.FirstOrDefault(c => c.Id == articleComment.Id);

            return updatedComment != null && updatedComment.Comment == articleComment.Comment;
        }

    }
}

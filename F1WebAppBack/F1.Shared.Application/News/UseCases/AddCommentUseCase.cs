using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases
{
    class AddCommentUseCase : IAddCommentUseCase
    {
        private readonly INewsServices _newsServices;
        public AddCommentUseCase(INewsServices newsServices)
        {
            _newsServices = newsServices;
        }
        public async Task<IArticleComment?> AddComment(IArticleComment comment, long articleId)
        {
            var articleComments = await _newsServices.GetArticleCommentsByNewId(articleId);

            // Check if the comment already exists
            var existingComment = articleComments.FirstOrDefault(c => c.Comment.Equals(comment.Comment) && c.User.Id.Equals(comment.User.Id));

            if (existingComment != null)
            {
                throw new InvalidOperationException("Comment already exists");
            }

            // Add the new comment
            await _newsServices.CreateArticleComment(comment, articleId);

            var article = await _newsServices.GetCompleteNewById(articleId);

            return article?.Comments?.FirstOrDefault(c => c.Comment.Equals(comment.Comment) && c.User.Id.Equals(comment.User.Id));
        }

    }

}

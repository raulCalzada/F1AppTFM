using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases
{
    class DeleteNewUseCase : IDeleteNewUseCase
    {
        private readonly INewsServices _newsServices;

        public DeleteNewUseCase(INewsServices newsServices)
        {
            _newsServices = newsServices;
        }

        public async Task<INew> DeleteNew(long id)
        {
            var article = await _newsServices.GetCompleteNewById(id);

            if (article == null)
            {
                throw new InvalidOperationException("New not found");
            }

            //if article has comments delete them
            if (article.Comments != null)
            {
                article.Comments.ToList().ForEach(async comment =>
                {
                    await _newsServices.DeleteArticleComment(comment.Id);
                });
            }

            await _newsServices.DeleteNew(id);

            var articleShouldBeDeleted = await _newsServices.GetCompleteNewById(id);

            if (articleShouldBeDeleted != null)
            {
                throw new InvalidOperationException("New not deleted");
            }

            return article;
        }
    }
}

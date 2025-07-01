using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases
{
    class UpdateNewUseCase : IUpdateNewUseCase
    {
        private readonly INewsServices _newsServices;

        public UpdateNewUseCase(INewsServices newsServices)
        {
            _newsServices = newsServices;
        }
        public async Task<INew> UpdateNew(INew news)
        {
            var article = await _newsServices.GetCompleteNewById(news.Id);

            if (article == null || !article.Id.Equals(news.Id))
            {
                throw new InvalidOperationException("New not found");
            }

            await _newsServices.UpdateNew(news);

            var articleUpdated = await _newsServices.GetCompleteNewById(news.Id);

            if (articleUpdated == null)
            {
                throw new InvalidOperationException("New not updated correctly");
            }

            return articleUpdated;
        }
    }
}

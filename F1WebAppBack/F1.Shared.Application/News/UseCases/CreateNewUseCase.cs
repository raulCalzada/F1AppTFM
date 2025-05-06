using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases
{
    class CreateNewUseCase : ICreateNewUseCase
    {
        private readonly INewsServices _newsServices;

        public CreateNewUseCase(INewsServices newsServices)
        {
            _newsServices = newsServices;
        }

        public async Task<INew> CreateNew(INew news)
        {
            await _newsServices.CreateNew(news);

            var article = await _newsServices.GetNews(1);

            if (article == null)
            {
                throw new InvalidOperationException("New not created");
            }

            var articleToVerifyCreation = article.First();

            if (!articleToVerifyCreation.Title.Equals(news.Title))
            {
                throw new InvalidOperationException("New not created");
            }

            return articleToVerifyCreation;
        }
    }
}

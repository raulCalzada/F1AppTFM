using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases
{
    class GetLastNewsUseCase : IGetLastNewsUseCase
    {
        private readonly INewsServices _newsServices;

        public GetLastNewsUseCase(INewsServices newsServices)
        {
            _newsServices = newsServices;
        }

        public Task<IEnumerable<INew>> GetLastNews(int? number = null)
        {
            return _newsServices.GetNews(number);
        }
    }
}

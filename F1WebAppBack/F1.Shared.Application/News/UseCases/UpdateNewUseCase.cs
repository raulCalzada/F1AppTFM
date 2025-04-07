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
        public Task<INew> UpdateNew(INew news)
        {
            
        }
    }
}

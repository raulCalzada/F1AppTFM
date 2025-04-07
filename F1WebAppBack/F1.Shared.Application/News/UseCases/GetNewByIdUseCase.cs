using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases
{
    class GetNewByIdUseCase : IGetNewByIdUseCase
    {
        private readonly INewsServices _newsServices;

        public GetNewByIdUseCase(INewsServices newsServices)
        {
            _newsServices = newsServices;
        }
        public async Task<INew?> GetNewById(long id)
        {
            return await _newsServices.GetCompleteNewById(id);
        }
    }
}

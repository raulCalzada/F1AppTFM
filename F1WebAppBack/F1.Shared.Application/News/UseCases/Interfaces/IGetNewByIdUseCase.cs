using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases.Interfaces
{
    public interface IGetNewByIdUseCase
    {
        Task<INew?> GetNewById(long id);
    }
}

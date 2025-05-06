using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases.Interfaces
{
    public interface IUpdateNewUseCase
    {
        Task<INew> UpdateNew(INew news);
    }
}

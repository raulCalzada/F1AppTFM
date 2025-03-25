using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.News.Interfaces
{
    public interface INewsRespository
    {
        Task<IEnumerable<INew>> GetLastNews(int? quantity);
        Task<INew?> GetNewById(long id);
        Task CreateNew(INew news);
        Task UpdateNew(INew news);
        Task DeleteNew(long id);
    }
}

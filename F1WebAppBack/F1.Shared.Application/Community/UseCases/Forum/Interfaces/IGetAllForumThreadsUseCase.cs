using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Forum.Interfaces
{
    public interface IGetAllForumThreadsUseCase
    {
        Task<IEnumerable<IForum>> GetAllThreads();
    }
}
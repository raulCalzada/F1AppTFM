using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Forum.Interfaces
{
    public interface IForumThreadRepository
    {
        Task CreateForum(string title, string description, long userId);
        Task DeleteForum(int forumId);
        Task<IEnumerable<IForum>> GetAllForums();
        Task<IForum?> GetForumById(int forumId);
    }
}

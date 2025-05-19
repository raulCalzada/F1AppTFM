using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.Services.Interfaces
{
    public interface IForumServices
    {
        Task CreateForum(string title, string description, long userId);
        Task DeleteForum(int forumId);
        Task<IEnumerable<IForum>> GetAllThreads();
        Task<IForum?> GetCompleteThreadForumById(int forumId);
        Task CreateForumComment(int forumId, string comment, long userId);
        Task DeleteForumComment(long commentId);
    }
}

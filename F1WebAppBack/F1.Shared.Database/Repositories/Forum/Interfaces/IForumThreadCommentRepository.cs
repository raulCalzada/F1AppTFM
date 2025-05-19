using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Forum.Interfaces
{
    public interface IForumThreadCommentRepository
    {
        Task CreateForumComment(int forumId, string comment, long userId);
        Task DeleteForumComment(long commentId);
        Task<IEnumerable<IForumComment>> GetAllThreadComments(int forumId);
    }
}

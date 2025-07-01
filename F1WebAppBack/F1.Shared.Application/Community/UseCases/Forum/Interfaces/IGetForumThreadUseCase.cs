using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Forum.Interfaces
{
    public interface IGetForumThreadUseCase
    {
        Task<IForum?> GetCompleteThreadForumById(int forumId);
    }
}

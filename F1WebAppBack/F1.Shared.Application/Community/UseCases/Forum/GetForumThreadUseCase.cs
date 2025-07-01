using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Forum
{
    class GetForumThreadUseCase : IGetForumThreadUseCase
    {
        private readonly IForumServices _forumServices;

        public GetForumThreadUseCase(IForumServices forumServices)
        {
            _forumServices = forumServices;
        }
        public async Task<IForum?> GetCompleteThreadForumById(int forumId)
        {
            return await _forumServices.GetCompleteThreadForumById(forumId);
        }
    }
}
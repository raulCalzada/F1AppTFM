using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Forum
{
    class GetAllForumThreadsUseCase : IGetAllForumThreadsUseCase
    {
        private readonly IForumServices _forumServices;

        public GetAllForumThreadsUseCase(IForumServices forumServices)
        {
            _forumServices = forumServices;
        }

        public async Task<IEnumerable<IForum>> GetAllThreads()
        {
            var threads = await _forumServices.GetAllThreads();
            
            if (threads == null)
            {
                throw new InvalidOperationException("No threads found");
            }

            return threads;
        }
    }
}

using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace F1.Shared.Application.Community.UseCases.Forum
{
    class DeleteForumThreadUseCase : IDeleteForumThreadUseCase
    {
        private readonly IForumServices _forumServices;

        public DeleteForumThreadUseCase(IForumServices forumServices)
        {
            _forumServices = forumServices;
        }

        public async Task<bool> DeleteThread(int threadId)
        {
            var forum = await _forumServices.GetCompleteThreadForumById(threadId);

            if (forum == null)
            {
                throw new InvalidOperationException("Forum not found");
            }

            await _forumServices.DeleteForum(threadId);

            var deletedForum = await _forumServices.GetCompleteThreadForumById(threadId);

            if (deletedForum == null)
            {
                return true;
            }
            else
            {
                throw new InvalidOperationException("Failed to delete forum");
            }
        }
    }
}

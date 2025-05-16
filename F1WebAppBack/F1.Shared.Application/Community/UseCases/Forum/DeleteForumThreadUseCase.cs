using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using F1.Shared.Application.News.UseCases.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Forum
{
    class DeleteForumThreadUseCase : IDeleteForumThreadUseCase
    {
        private readonly IForumServices _forumServices;
        private readonly IDeleteForumCommentUseCase _deleteForumCommentUseCase;

        public DeleteForumThreadUseCase(IForumServices forumServices, IDeleteForumCommentUseCase deleteForumCommentUseCase)
        {
            _forumServices = forumServices;
            _deleteForumCommentUseCase = deleteForumCommentUseCase;
        }

        public async Task<bool> DeleteThread(int threadId)
        {
            var forum = await _forumServices.GetCompleteThreadForumById(threadId);

            if (forum == null)
            {
                throw new InvalidOperationException("Forum not found");
            }

            if (forum.Comments.Any())
            {
                foreach (var comment in forum.Comments)
                {
                    await _deleteForumCommentUseCase.DeleteComment(comment.Id);
                }
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

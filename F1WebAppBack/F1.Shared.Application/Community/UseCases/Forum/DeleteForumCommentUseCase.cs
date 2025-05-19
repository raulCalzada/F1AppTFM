using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Forum
{
    class DeleteForumCommentUseCase : IDeleteForumCommentUseCase
    {
        private readonly IForumServices _forumServices;

        public DeleteForumCommentUseCase(IForumServices forumServices)
        {
            _forumServices = forumServices;
        }

        public async Task DeleteComment(long commentId)
        {
            await _forumServices.DeleteForumComment(commentId);
        }
    }
}

using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Forum
{
    class CreateForumCommentUseCase : ICreateForumCommentUseCase
    {
        private readonly IForumServices _forumServices;
        private readonly IUserService _userService;
        public CreateForumCommentUseCase(IForumServices forumServices, IUserService userService)
        {
            _forumServices = forumServices;
            _userService = userService;
        }

        public async Task<IForum> CreateForumComment(string content, long userId, int threadId)
        {
            var user = await _userService.GetUserById(userId);

            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }

            await _forumServices.CreateForumComment(threadId, content, userId);

            var forum = await _forumServices.GetCompleteThreadForumById(threadId);

            if (forum == null)
            {
                throw new InvalidOperationException("Forum not found");
            }

            if (!forum.Comments.Any(c => c.Comment.Equals(content)))
            {
                throw new InvalidOperationException("Comment not found");
            }

            return forum;
        }
    }
}

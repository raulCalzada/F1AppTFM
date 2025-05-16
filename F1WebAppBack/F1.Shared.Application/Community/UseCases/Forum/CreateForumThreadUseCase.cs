using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Forum
{
    class CreateForumThreadUseCase : ICreateForumThreadUseCase
    {
        private readonly IForumServices _forumServices;
        private readonly IUserService _userService;

        public CreateForumThreadUseCase(IForumServices forumServices, IUserService userService)
        {
            _forumServices = forumServices;
            _userService = userService;
        }

        public async Task<IForum> CreateThread(string title, string description, long userId)
        {
            var user = await _userService.GetUserById(userId);
            if (user == null)
            {
                throw new InvalidOperationException("User not found");
            }

            await _forumServices.CreateForum(title, description, userId);

            var forum = await _forumServices.GetAllThreads();

            if (forum == null)
            {
                throw new InvalidOperationException("Forum not found");
            }

            if (!forum.Any(f => f.Title.Equals(title) && f.Description.Equals(description)))
            {
                throw new InvalidOperationException("Forum thread not found");
            }

            return forum.First(f => f.Title.Equals(title) && f.Description.Equals(description));
        }
    }
}

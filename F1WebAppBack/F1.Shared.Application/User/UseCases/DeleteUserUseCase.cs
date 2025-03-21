using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.UseCases
{
    internal class DeleteUserUseCase : IDeleteUserUseCase
    {
        private readonly IUserService _userService;
        public DeleteUserUseCase(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<IUser> DeleteUser(long userId)
        {
            var user = await _userService.GetUserById(userId);

            if (user == null)
            {
                throw new InvalidOperationException("User does not exist");
            }

            var result = await _userService.DeleteUser(user);

            if (!result)
            {
                throw new InvalidOperationException("User could not be deleted");
            }

            return user;
        }
    }
}

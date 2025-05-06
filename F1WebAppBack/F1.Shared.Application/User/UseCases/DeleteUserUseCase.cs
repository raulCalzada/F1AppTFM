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

        public async Task<IUser?> DeleteUser(long userId)
        {
            var user = await _userService.GetUserById(userId);

            if (user == null)
            {
                throw new InvalidOperationException("User does not exist");
            }

            await _userService.DeleteUser(user);

            if (await _userService.GetUserById(userId) == null)
            {
                return user;
            }
            
            return null;
        }
    }
}

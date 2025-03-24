using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.UseCases
{
    internal class UpdateUserUseCase : IUpdateUserUseCase
    {
        private readonly IUserService _userService;

        public UpdateUserUseCase(IUserService userService)
        {
            _userService = userService;
        }
        public async Task<IUser?> UpdateUser(IUser user)
        {
            var userShouldExist = await _userService.GetUserById(user.Id);

            if (userShouldExist == null)
            {
                throw new InvalidOperationException("User does not exist");
            }

            await _userService.UpdateUser(user);

            return await _userService.GetUserById(user.Id);
        }
    }
}

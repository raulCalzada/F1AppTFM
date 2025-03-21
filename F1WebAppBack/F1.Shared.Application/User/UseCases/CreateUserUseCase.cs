using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.UseCases
{
    internal class CreateUserUseCase : ICreateUserUseCase
    {
        private readonly IUserService _userService;
        public CreateUserUseCase(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<IUser?> CreateUser(IUser user)
        {
            var userShouldntExist = await _userService.GetUserByUsername(user.Username);

            if (userShouldntExist != null)
            {
                throw new InvalidOperationException("User already exists");
            }

            var created = await _userService.CreateUser(user);

            if (created)
            {
                return await _userService.GetUserByUsername(user.Username);
            }

            return null;
        }
    }
}

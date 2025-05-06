using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.UseCases
{
    internal class GetUserByUsernameUseCase : IGetUserByUsernameUseCase
    {
        private readonly IUserService _userService;

        public GetUserByUsernameUseCase(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<IUser?> GetUserByUsername(string username)
        {
            return await _userService.GetUserByUsername(username);
        }
    }
}

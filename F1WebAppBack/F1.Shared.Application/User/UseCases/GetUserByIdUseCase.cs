using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.UseCases
{
    internal class GetUserByIdUseCase : IGetUserByIdUseCase
    {
        private readonly IUserService _userService;

        public GetUserByIdUseCase(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<IUser?> GetUserById(long userId)
        {
            return await _userService.GetUserById(userId);
        }
    }
}

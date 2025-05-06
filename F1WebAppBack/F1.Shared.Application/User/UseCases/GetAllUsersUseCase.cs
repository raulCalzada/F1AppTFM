using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.UseCases
{
    internal class GetAllUsersUseCase : IGetAllUsersUseCase
    {
        private readonly IUserService _userService;
        public GetAllUsersUseCase(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<IEnumerable<IUser>> GetUsers()
        {
            return await _userService.GetAllUsers();
        }
    }
}

using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Database.Repositories.Users.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<IUser>> GetAllUsers()
        {
            return await _userRepository.GetAllUsers();
        }
    }
}

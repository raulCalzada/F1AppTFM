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

        public async Task<bool> CreateUser(IUser user)
        {
            return await _userRepository.CreateUser(user);
        }

        public async Task<bool> DeleteUser(IUser user)
        {
            return await _userRepository.DeleteUser(user.Id);
        }

        public async Task<IEnumerable<IUser>> GetAllUsers()
        {
            return await _userRepository.GetAllUsers();
        }

        public async Task<IUser?> GetUserById(long id)
        {
            return await _userRepository.GetUserById(id);
        }

        public Task<IUser?> GetUserByUsername(string userName)
        {
            return _userRepository.GetUserByUserName(userName);
        }

        public Task<bool> UpdateUser(IUser user)
        {
            return _userRepository.UpdateUser(user);
        }
    }
}

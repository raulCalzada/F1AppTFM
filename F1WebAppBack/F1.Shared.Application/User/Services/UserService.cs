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

        public async Task CreateUser(IUser user)
        {
            await _userRepository.CreateUser(user);
        }

        public async Task DeleteUser(IUser user)
        {
            await _userRepository.DeleteUser(user.Id);
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

        public Task UpdateUser(IUser user)
        {
            return _userRepository.UpdateUser(user);
        }

        public async Task GivePoints(long userId, long pointsToAdd)
        {
            var user = await _userRepository.GetUserById(userId);

            if (user == null)
            {
                return;
            }

            user.Points += pointsToAdd;

            await _userRepository.UpdateUser(user);
        }
    }
}

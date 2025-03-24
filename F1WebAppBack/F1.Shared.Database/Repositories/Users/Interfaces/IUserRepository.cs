using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Users.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<IUser>> GetAllUsers();
        Task<IUser?> GetUserById(long userId);
        Task<IUser?> GetUserByUserName(string userName);
        Task DeleteUser(long userId);
        Task CreateUser(IUser user);
        Task UpdateUser(IUser user);
    }
}

using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<IUser>> GetAllUsers();
        Task<IUser?> GetUserById(long id);
        Task<IUser?> GetUserByUsername(string userName); 
        Task DeleteUser(IUser user);
        Task CreateUser(IUser user);
        Task UpdateUser(IUser user);
        Task GivePoints(long userId, long pointsToAdd);
    }
}

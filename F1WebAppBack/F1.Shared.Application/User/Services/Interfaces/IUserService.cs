using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<IUser>> GetAllUsers();
        Task<IUser?> GetUserById(long id);
        Task<IUser?> GetUserByUsername(string userName); 
        Task<bool> DeleteUser(IUser user);
        Task<bool> CreateUser(IUser user);
        Task<bool> UpdateUser(IUser user);




    }
}

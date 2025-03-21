using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Users.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<IUser>> GetAllUsers();
    }
}

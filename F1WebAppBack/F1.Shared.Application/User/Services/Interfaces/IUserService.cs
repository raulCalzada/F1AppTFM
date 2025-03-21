using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<IUser>> GetAllUsers();
    }
}

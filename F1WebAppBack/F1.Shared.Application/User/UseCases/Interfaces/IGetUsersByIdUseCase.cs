using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.UseCases.Interfaces
{
    public interface IGetUsersByIdUseCase
    {
        Task<IEnumerable<IUser>> GetUsers();
    }
}

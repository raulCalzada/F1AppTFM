using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Application.User.UseCases.Interfaces
{
    public interface IGetUserByIdUseCase
    {
        Task<IUser?> GetUserById(long userId);
    }
}

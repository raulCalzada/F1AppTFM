using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Users.Dtos;
using F1.Shared.Database.Repositories.Users.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;
using System.Data;

namespace F1.Shared.Database.Repositories.Users
{
    public class UsersRepository : IUserRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;
        public UsersRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task<IEnumerable<IUser>> GetAllUsers()
        {
            var userDtoList =await _storeProcedureRepository.QueryAsync<UserDto>("SELECT * FROM Users", commandType: CommandType.Text);

            return userDtoList.Select(x => x.ToDomain()).ToList();
        }
    }
}

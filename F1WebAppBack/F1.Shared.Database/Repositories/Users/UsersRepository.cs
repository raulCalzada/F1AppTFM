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
            var userDtoList = await _storeProcedureRepository.QueryAsync<UserDto>("SELECT * FROM Users", commandType: CommandType.Text);
            return userDtoList.Select(x => x.ToDomain()).ToList();
        }

        public async Task<bool> CreateUser(IUser user)
        {
            var userDto = UserDto.FromDomain(user);
            return await _storeProcedureRepository.ExecuteAsync("CreateUser", userDto, CommandType.StoredProcedure);          
        }

        public async Task<bool> DeleteUser(long userId)
        {
            return await _storeProcedureRepository.ExecuteAsync("SELECT * FROM Users WHERE Id = @Id", new { Id = userId }, commandType: CommandType.Text);
        }

        public async Task<bool> UpdateUser(IUser user)
        {
            var userDto = UserDto.FromDomain(user);
            return await _storeProcedureRepository.ExecuteAsync("UpdateUser", userDto, CommandType.StoredProcedure);
        }

        public async Task<IUser?> GetUserById(long userId)
        {
            var userDto = await _storeProcedureRepository.QueryFirstOrDefaultAsync<UserDto>("SELECT * FROM Users WHERE Id = @Id", new { Id = userId }, commandType: CommandType.Text);
            return userDto?.ToDomain();
        }

        public async Task<IUser?> GetUserByUserName(string userName)
        {
            var userDto = await _storeProcedureRepository.QueryFirstOrDefaultAsync<UserDto>("SELECT * FROM Users WHERE UserName = @UserName", new { UserName = userName }, commandType: CommandType.Text);
            return userDto?.ToDomain();
        }
    }
}

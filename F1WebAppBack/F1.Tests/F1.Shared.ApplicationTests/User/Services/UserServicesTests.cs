using F1.Shared.Application.User.Services;
using F1.Shared.Database.Repositories.Users.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;
using Moq;

namespace F1.Shared.ApplicationTests.User.Services
{
    public class UserServicesTests
    {
        private readonly Mock<IUserRepository> _userRepositoryMock;
        private readonly UserService _userService;

        public UserServicesTests()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _userService = new UserService(_userRepositoryMock.Object);
        }

        [Fact]
        public async Task CreateUser_ShouldCallRepository()
        {
            var userMock = new Mock<IUser>();

            _userRepositoryMock
                .Setup(r => r.CreateUser(userMock.Object))
                .Returns(Task.CompletedTask);

            await _userService.CreateUser(userMock.Object);

            _userRepositoryMock.Verify(r => r.CreateUser(userMock.Object), Times.Once);
        }

        [Fact]
        public async Task DeleteUser_ShouldCallRepository()
        {
            var userMock = new Mock<IUser>();
            userMock.SetupGet(u => u.Id).Returns(1);

            _userRepositoryMock
                .Setup(r => r.DeleteUser(1))
                .Returns(Task.CompletedTask);

            await _userService.DeleteUser(userMock.Object);

            _userRepositoryMock.Verify(r => r.DeleteUser(1), Times.Once);
        }

        [Fact]
        public async Task GetAllUsers_ShouldReturnUsers()
        {
            var users = new List<IUser> { new Mock<IUser>().Object };

            _userRepositoryMock
                .Setup(r => r.GetAllUsers())
                .ReturnsAsync(users);

            var result = await _userService.GetAllUsers();

            Assert.NotNull(result);
            Assert.Equal(users, result);
        }

        [Fact]
        public async Task GetUserById_ShouldReturnUser()
        {
            long userId = 1;
            var userMock = new Mock<IUser>();

            _userRepositoryMock
                .Setup(r => r.GetUserById(userId))
                .ReturnsAsync(userMock.Object);

            var result = await _userService.GetUserById(userId);

            Assert.NotNull(result);
            Assert.Equal(userMock.Object, result);
        }

        [Fact]
        public async Task GetUserById_ShouldReturnNull_WhenNotFound()
        {
            long userId = 1;

            _userRepositoryMock
                .Setup(r => r.GetUserById(userId))
                .ReturnsAsync((IUser?)null);

            var result = await _userService.GetUserById(userId);

            Assert.Null(result);
        }

        [Fact]
        public async Task GetUserByUsername_ShouldReturnUser()
        {
            string username = "testuser";
            var userMock = new Mock<IUser>();

            _userRepositoryMock
                .Setup(r => r.GetUserByUserName(username))
                .ReturnsAsync(userMock.Object);

            var result = await _userService.GetUserByUsername(username);

            Assert.NotNull(result);
            Assert.Equal(userMock.Object, result);
        }

        [Fact]
        public async Task GetUserByUsername_ShouldReturnNull_WhenNotFound()
        {
            string username = "testuser";

            _userRepositoryMock
                .Setup(r => r.GetUserByUserName(username))
                .ReturnsAsync((IUser?)null);

            var result = await _userService.GetUserByUsername(username);

            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateUser_ShouldCallRepository()
        {
            var userMock = new Mock<IUser>();

            _userRepositoryMock
                .Setup(r => r.UpdateUser(userMock.Object))
                .Returns(Task.CompletedTask);

            await _userService.UpdateUser(userMock.Object);

            _userRepositoryMock.Verify(r => r.UpdateUser(userMock.Object), Times.Once);
        }
    }
}

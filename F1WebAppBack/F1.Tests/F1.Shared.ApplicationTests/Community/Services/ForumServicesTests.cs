using F1.Shared.Application.Community.Services;
using F1.Shared.Database.Repositories.Forum.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using Moq;

namespace F1.Shared.ApplicationTests.Community.Services
{
    public class ForumServicesTests
    {
        private readonly Mock<IForumThreadRepository> _forumRepositoryMock;
        private readonly Mock<IForumThreadCommentRepository> _forumThreadCommentRepositoryMock;
        private readonly ForumServices _forumServices;

        public ForumServicesTests()
        {
            _forumRepositoryMock = new Mock<IForumThreadRepository>();
            _forumThreadCommentRepositoryMock = new Mock<IForumThreadCommentRepository>();
            _forumServices = new ForumServices(
                _forumRepositoryMock.Object,
                _forumThreadCommentRepositoryMock.Object
            );
        }

        [Fact]
        public async Task CreateForum_ShouldCallRepository()
        {
            string title = "Test Forum";
            string description = "Description";
            long userId = 1;

            _forumRepositoryMock
                .Setup(r => r.CreateForum(title, description, userId))
                .Returns(Task.CompletedTask);

            await _forumServices.CreateForum(title, description, userId);

            _forumRepositoryMock.Verify(r => r.CreateForum(title, description, userId), Times.Once);
        }

        [Fact]
        public async Task CreateForumComment_ShouldCallRepository()
        {
            int forumId = 1;
            string comment = "Test comment";
            long userId = 2;

            _forumThreadCommentRepositoryMock
                .Setup(r => r.CreateForumComment(forumId, comment, userId))
                .Returns(Task.CompletedTask);

            await _forumServices.CreateForumComment(forumId, comment, userId);

            _forumThreadCommentRepositoryMock.Verify(r => r.CreateForumComment(forumId, comment, userId), Times.Once);
        }

        [Fact]
        public async Task DeleteForum_ShouldCallRepository()
        {
            int forumId = 1;

            _forumRepositoryMock
                .Setup(r => r.DeleteForum(forumId))
                .Returns(Task.CompletedTask);

            await _forumServices.DeleteForum(forumId);

            _forumRepositoryMock.Verify(r => r.DeleteForum(forumId), Times.Once);
        }

        [Fact]
        public async Task DeleteForumComment_ShouldCallRepository()
        {
            long commentId = 1;

            _forumThreadCommentRepositoryMock
                .Setup(r => r.DeleteForumComment(commentId))
                .Returns(Task.CompletedTask);

            await _forumServices.DeleteForumComment(commentId);

            _forumThreadCommentRepositoryMock.Verify(r => r.DeleteForumComment(commentId), Times.Once);
        }

        [Fact]
        public async Task GetAllThreads_ShouldReturnForums()
        {
            var forums = new List<IForum> { new Mock<IForum>().Object };

            _forumRepositoryMock
                .Setup(r => r.GetAllForums())
                .ReturnsAsync(forums);

            var result = await _forumServices.GetAllThreads();

            Assert.NotNull(result);
            Assert.Equal(forums, result);
        }

        [Fact]
        public async Task GetCompleteThreadForumById_ShouldReturnForumWithComments()
        {
            int forumId = 1;
            var forumMock = new Mock<IForum>();
            var comments = new List<IForumComment> { new Mock<IForumComment>().Object };

            _forumRepositoryMock
                .Setup(r => r.GetForumById(forumId))
                .ReturnsAsync(forumMock.Object);

            _forumThreadCommentRepositoryMock
                .Setup(r => r.GetAllThreadComments(forumId))
                .ReturnsAsync(comments);

            forumMock.SetupSet(f => f.Comments = comments);

            var result = await _forumServices.GetCompleteThreadForumById(forumId);

            Assert.NotNull(result);
            forumMock.VerifySet(f => f.Comments = comments, Times.Once);
        }

        [Fact]
        public async Task GetCompleteThreadForumById_ShouldReturnNull_WhenNotFound()
        {
            int forumId = 1;

            _forumRepositoryMock
                .Setup(r => r.GetForumById(forumId))
                .ReturnsAsync((IForum?)null);

            var result = await _forumServices.GetCompleteThreadForumById(forumId);

            Assert.Null(result);
        }
    }
}

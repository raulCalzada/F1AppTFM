using F1.Shared.Application.News.Services;
using F1.Shared.Database.Repositories.News.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;
using Moq;

namespace F1.Shared.ApplicationTests.News.Services
{
    public class NewsServiceTests
    {
        private readonly Mock<INewsRespository> _newsRepositoryMock;
        private readonly Mock<INewsCommentsRepository> _newsCommentsRepositoryMock;
        private readonly NewsServices _newsServices;

        public NewsServiceTests()
        {
            _newsRepositoryMock = new Mock<INewsRespository>();
            _newsCommentsRepositoryMock = new Mock<INewsCommentsRepository>();
            _newsServices = new NewsServices(
                _newsRepositoryMock.Object,
                _newsCommentsRepositoryMock.Object
            );
        }

        [Fact]
        public async Task CreateArticleComment_ShouldCallRepository()
        {
            var commentMock = new Mock<IArticleComment>();
            long articleId = 1;

            _newsCommentsRepositoryMock
                .Setup(r => r.CreateComment(commentMock.Object, articleId))
                .Returns(Task.CompletedTask);

            await _newsServices.CreateArticleComment(commentMock.Object, articleId);

            _newsCommentsRepositoryMock.Verify(r => r.CreateComment(commentMock.Object, articleId), Times.Once);
        }

        [Fact]
        public async Task CreateNew_ShouldCallRepository()
        {
            var newsMock = new Mock<INew>();

            _newsRepositoryMock
                .Setup(r => r.CreateNew(newsMock.Object))
                .Returns(Task.CompletedTask);

            await _newsServices.CreateNew(newsMock.Object);

            _newsRepositoryMock.Verify(r => r.CreateNew(newsMock.Object), Times.Once);
        }

        [Fact]
        public async Task DeleteArticleComment_ShouldCallRepository()
        {
            long commentId = 1;

            _newsCommentsRepositoryMock
                .Setup(r => r.DeleteComment(commentId))
                .Returns(Task.CompletedTask);

            await _newsServices.DeleteArticleComment(commentId);

            _newsCommentsRepositoryMock.Verify(r => r.DeleteComment(commentId), Times.Once);
        }

        [Fact]
        public async Task DeleteNew_ShouldCallRepository()
        {
            long newsId = 1;

            _newsRepositoryMock
                .Setup(r => r.DeleteNew(newsId))
                .Returns(Task.CompletedTask);

            await _newsServices.DeleteNew(newsId);

            _newsRepositoryMock.Verify(r => r.DeleteNew(newsId), Times.Once);
        }

        [Fact]
        public async Task GetArticleCommentsByNewId_ShouldReturnComments()
        {
            long articleId = 1;
            var comments = new List<IArticleComment> { new Mock<IArticleComment>().Object };

            _newsCommentsRepositoryMock
                .Setup(r => r.GetCommentsByArticleId(articleId))
                .ReturnsAsync(comments);

            var result = await _newsServices.GetArticleCommentsByNewId(articleId);

            Assert.NotNull(result);
            Assert.Equal(comments, result);
        }

        [Fact]
        public async Task GetCompleteNewById_ShouldReturnArticleWithComments()
        {
            long newsId = 1;
            var newsMock = new Mock<INew>();
            var comments = new List<IArticleComment> { new Mock<IArticleComment>().Object };

            _newsRepositoryMock
                .Setup(r => r.GetNewById(newsId))
                .ReturnsAsync(newsMock.Object);

            _newsCommentsRepositoryMock
                .Setup(r => r.GetCommentsByArticleId(newsId))
                .ReturnsAsync(comments);

            newsMock.SetupSet(n => n.Comments = comments);

            var result = await _newsServices.GetCompleteNewById(newsId);

            Assert.NotNull(result);
            newsMock.VerifySet(n => n.Comments = comments, Times.Once);
        }

        [Fact]
        public async Task GetCompleteNewById_ShouldReturnNull_WhenNotFound()
        {
            long newsId = 1;

            _newsRepositoryMock
                .Setup(r => r.GetNewById(newsId))
                .ReturnsAsync((INew?)null);

            var result = await _newsServices.GetCompleteNewById(newsId);

            Assert.Null(result);
        }

        [Fact]
        public async Task GetNews_ShouldReturnNews()
        {
            var newsList = new List<INew> { new Mock<INew>().Object };

            _newsRepositoryMock
                .Setup(r => r.GetLastNews(null))
                .ReturnsAsync(newsList);

            var result = await _newsServices.GetNews();

            Assert.NotNull(result);
            Assert.Equal(newsList, result);
        }

        [Fact]
        public async Task UpdateArticleComment_ShouldCallRepository()
        {
            var commentMock = new Mock<IArticleComment>();

            _newsCommentsRepositoryMock
                .Setup(r => r.UpdateComment(commentMock.Object))
                .Returns(Task.CompletedTask);

            await _newsServices.UpdateArticleComment(commentMock.Object);

            _newsCommentsRepositoryMock.Verify(r => r.UpdateComment(commentMock.Object), Times.Once);
        }

        [Fact]
        public async Task UpdateNew_ShouldCallRepository()
        {
            var newsMock = new Mock<INew>();

            _newsRepositoryMock
                .Setup(r => r.UpdateNew(newsMock.Object))
                .Returns(Task.CompletedTask);

            await _newsServices.UpdateNew(newsMock.Object);

            _newsRepositoryMock.Verify(r => r.UpdateNew(newsMock.Object), Times.Once);
        }
    }
}

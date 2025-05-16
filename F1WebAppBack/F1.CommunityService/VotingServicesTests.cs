using F1.Shared.Application.Community.Services;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Repositories.Interfaces;
using F1.Shared.Domain.Comunity.Enums;
using Moq;
using Xunit;

namespace F1.Shared.ApplicationTests.Community.Services
{
    public class VotingServicesTests
    {
        private readonly Mock<IVotesRepository> _votesRepositoryMock;
        private readonly Mock<IVoteOptionsRepository> _voteOptionsRepositoryMock;
        private readonly Mock<IVoteQuestionsRepository> _voteQuestionsRepositoryMock;
        private readonly VotingServices _votingServices;

        public VotingServicesTests()
        {
            _votesRepositoryMock = new Mock<IVotesRepository>();
            _voteOptionsRepositoryMock = new Mock<IVoteOptionsRepository>();
            _voteQuestionsRepositoryMock = new Mock<IVoteQuestionsRepository>();
            _votingServices = new VotingServices(
                _votesRepositoryMock.Object,
                _voteOptionsRepositoryMock.Object,
                _voteQuestionsRepositoryMock.Object
            );
        }

        [Fact]
        public async Task ChangeVoteStatus_ShouldCallRepository()
        {
            // Arrange
            long questionId = 1;
            VotingStatus status = VotingStatus.Open;
            _voteQuestionsRepositoryMock
                .Setup(r => r.ChangeVoteStatus(questionId, status))
                .Returns(Task.CompletedTask);

            // Act
            await _votingServices.ChangeVoteStatus(questionId, status);

            // Assert
            _voteQuestionsRepositoryMock.Verify(r => r.ChangeVoteStatus(questionId, status), Times.Once);
        }

        [Fact]
        public async Task CreateVote_ShouldCallRepositories()
        {
            // Arrange
            var voteQMock = new Mock<IVoteQuestion>();
            voteQMock.SetupGet(v => v.Id).Returns(10);
            voteQMock.SetupGet(v => v.Question).Returns("Q?");
            voteQMock.SetupGet(v => v.Options).Returns(new List<string> { "A", "B" });
            voteQMock.SetupGet(v => v.State).Returns(VotingStatus.Open);

            _voteQuestionsRepositoryMock
                .Setup(r => r.CreateVoteQuestion("Q?", It.IsAny<IEnumerable<string>>(), VotingStatus.Open))
                .Returns(Task.CompletedTask);

            _voteOptionsRepositoryMock
                .Setup(r => r.CreateVoteOption(10, It.IsAny<int>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);

            // Act
            await _votingServices.CreateVote(voteQMock.Object);

            // Assert
            _voteQuestionsRepositoryMock.Verify(r => r.CreateVoteQuestion("Q?", It.IsAny<IEnumerable<string>>(), VotingStatus.Open), Times.Once);
            _voteOptionsRepositoryMock.Verify(r => r.CreateVoteOption(10, 0, "A"), Times.Once);
            _voteOptionsRepositoryMock.Verify(r => r.CreateVoteOption(10, 1, "B"), Times.Once);
        }

        [Fact]
        public async Task Vote_ShouldCallRepository()
        {
            // Arrange
            long questionId = 1;
            long userId = 2;
            int option = 0;
            _votesRepositoryMock
                .Setup(r => r.Vote(questionId, option, userId))
                .Returns(Task.CompletedTask);

            // Act
            await _votingServices.Vote(questionId, userId, option);

            // Assert
            _votesRepositoryMock.Verify(r => r.Vote(questionId, option, userId), Times.Once);
        }

        [Fact]
        public async Task GetVotes_ShouldReturnVotes()
        {
            // Arrange
            long questionId = 1;
            var votes = new List<IVote> { new Mock<IVote>().Object };
            _votesRepositoryMock
                .Setup(r => r.GetVotes(questionId))
                .ReturnsAsync(votes);

            // Act
            var result = await _votingServices.GetVotes(questionId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(votes, result);
        }

        [Fact]
        public async Task GetAllVoteQuestions_ShouldReturnQuestions()
        {
            // Arrange
            var questions = new List<IVoteQuestion> { new Mock<IVoteQuestion>().Object };
            _voteQuestionsRepositoryMock
                .Setup(r => r.GetAllVoteQuestions())
                .ReturnsAsync(questions);

            // Act
            var result = await _votingServices.GetAllVoteQuestions();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(questions, result);
        }

        [Fact]
        public async Task GetVotesAndQuestion_ShouldReturnNull_WhenNotFound()
        {
            // Arrange
            long questionId = 1;
            _voteQuestionsRepositoryMock
                .Setup(r => r.GetVoteQuestion(questionId))
                .ReturnsAsync((IVoteQuestion?)null);

            // Act
            var result = await _votingServices.GetVotesAndQuestion(questionId);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetVotesAndQuestion_ShouldReturnQuestionWithOptionsAndVotes()
        {
            // Arrange
            long questionId = 1;
            var voteQMock = new Mock<IVoteQuestion>();
            voteQMock.SetupProperty(v => v.Options, new List<string>());
            voteQMock.SetupProperty(v => v.Votes, new List<IVote>());
            _voteQuestionsRepositoryMock
                .Setup(r => r.GetVoteQuestion(questionId))
                .ReturnsAsync(voteQMock.Object);

            var options = new List<string> { "A", "B" };
            _voteOptionsRepositoryMock
                .Setup(r => r.GetVoteOptions(questionId))
                .ReturnsAsync(options);

            var votes = new List<IVote> { new Mock<IVote>().Object };
            _votesRepositoryMock
                .Setup(r => r.GetVotes(questionId))
                .ReturnsAsync(votes);

            // Act
            var result = await _votingServices.GetVotesAndQuestion(questionId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(options, result.Options);
            Assert.Equal(votes, result.Votes);
        }

        [Fact]
        public async Task DeleteVotesAndQuestion_ShouldCallRepositories()
        {
            // Arrange
            var voteQMock = new Mock<IVoteQuestion>();
            voteQMock.SetupGet(v => v.Id).Returns(1);

            var userMock = new Mock<IUser>();
            userMock.SetupGet(u => u.Id).Returns(2);

            var voteMock = new Mock<IVote>();
            voteMock.SetupGet(v => v.User).Returns(userMock.Object);

            voteQMock.SetupGet(v => v.Votes).Returns(new List<IVote> { voteMock.Object });
            voteQMock.SetupGet(v => v.Options).Returns(new List<string> { "A", "B" });

            _votesRepositoryMock
                .Setup(r => r.DeleteVotes(1, 2))
                .Returns(Task.CompletedTask);

            _voteOptionsRepositoryMock
                .Setup(r => r.DeleteVoteOption(1, It.IsAny<int>()))
                .Returns(Task.CompletedTask);

            _voteQuestionsRepositoryMock
                .Setup(r => r.DeleteVoteQuestion(1))
                .Returns(Task.CompletedTask);

            // Act
            await _votingServices.DeleteVotesAndQuestion(voteQMock.Object);

            // Assert
            _votesRepositoryMock.Verify(r => r.DeleteVotes(1, 2), Times.Once);
            _voteOptionsRepositoryMock.Verify(r => r.DeleteVoteOption(1, 0), Times.Once);
            _voteOptionsRepositoryMock.Verify(r => r.DeleteVoteOption(1, 1), Times.Once);
            _voteQuestionsRepositoryMock.Verify(r => r.DeleteVoteQuestion(1), Times.Once);
        }
    }
}

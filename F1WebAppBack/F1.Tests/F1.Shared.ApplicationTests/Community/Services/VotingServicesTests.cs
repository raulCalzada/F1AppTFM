using F1.Shared.Application.Community.Services;
using F1.Shared.Database.Repositories.Votes.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;
using Moq;

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
            long questionId = 1;
            VotingStatus status = VotingStatus.Active;

            _voteQuestionsRepositoryMock
                .Setup(r => r.ChangeVoteStatus(questionId, status))
                .Returns(Task.CompletedTask);

            await _votingServices.ChangeVoteStatus(questionId, status);

            _voteQuestionsRepositoryMock.Verify(r => r.ChangeVoteStatus(questionId, status), Times.Once);
        }

        [Fact]
        public async Task CreateVote_ShouldCallRepositories()
        {
            var voteQMock = new Mock<IVoteQuestion>();
            voteQMock.SetupGet(v => v.Id).Returns(1);
            voteQMock.SetupGet(v => v.Question).Returns("Q?");
            voteQMock.SetupGet(v => v.State).Returns(VotingStatus.Active);
            voteQMock.SetupGet(v => v.Options).Returns(new List<string> { "A", "B" });

            _voteQuestionsRepositoryMock
                .Setup(r => r.CreateVoteQuestion(It.IsAny<string>(), It.IsAny<IEnumerable<string>>(), It.IsAny<VotingStatus>()))
                .Returns(Task.CompletedTask);

            _voteOptionsRepositoryMock
                .Setup(r => r.CreateVoteOption(It.IsAny<long>(), It.IsAny<int>(), It.IsAny<string>()))
                .Returns(Task.CompletedTask);

            await _votingServices.CreateVote(voteQMock.Object);

            _voteQuestionsRepositoryMock.Verify(r => r.CreateVoteQuestion("Q?", It.IsAny<IEnumerable<string>>(), VotingStatus.Active), Times.Once);
            _voteOptionsRepositoryMock.Verify(r => r.CreateVoteOption(1, 0, "A"), Times.Once);
            _voteOptionsRepositoryMock.Verify(r => r.CreateVoteOption(1, 1, "B"), Times.Once);
        }

        [Fact]
        public async Task Vote_ShouldCallRepository()
        {
            long questionId = 1;
            long userId = 2;
            int option = 0;

            _votesRepositoryMock
                .Setup(r => r.Vote(questionId, option, userId))
                .Returns(Task.CompletedTask);

            await _votingServices.Vote(questionId, userId, option);

            _votesRepositoryMock.Verify(r => r.Vote(questionId, option, userId), Times.Once);
        }

        [Fact]
        public async Task GetVotes_ShouldReturnVotes()
        {
            long questionId = 1;
            var votes = new List<IVote> { new Mock<IVote>().Object };

            _votesRepositoryMock
                .Setup(r => r.GetVotes(questionId))
                .ReturnsAsync(votes);

            var result = await _votingServices.GetVotes(questionId);

            Assert.NotNull(result);
            Assert.Equal(votes, result);
        }

        [Fact]
        public async Task GetAllVoteQuestions_ShouldReturnQuestions()
        {
            var questions = new List<IVoteQuestion> { new Mock<IVoteQuestion>().Object };

            _voteQuestionsRepositoryMock
                .Setup(r => r.GetAllVoteQuestions())
                .ReturnsAsync(questions);

            var result = await _votingServices.GetAllVoteQuestions();

            Assert.NotNull(result);
            Assert.Equal(questions, result);
        }
    }
}

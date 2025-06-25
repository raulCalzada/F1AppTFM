using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Votes.Dtos;
using F1.Shared.Database.Repositories.Votes.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using System.Data;

namespace F1.Shared.Database.Repositories.Votes
{
    class VotesRepository : IVotesRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public VotesRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task DeleteVotes(long questionId, long userId)
        {
            await _storeProcedureRepository.ExecuteAsync($"DELETE FROM Votes WHERE QuestionId = {questionId} AND UserId = {userId}", commandType: CommandType.Text);
        }

        public async Task<IEnumerable<IVote>> GetVotes(long questionId)
        {
            var dto = await _storeProcedureRepository.QueryAsync<VotesDto>($"SELECT * FROM Votes WHERE QuestionId = {questionId}", commandType: CommandType.Text);

            return dto.Select(x => x.ToDomain()).ToList();
        }

        public async Task Vote(long questionId, int option, long userId)
        {
            var sql = "INSERT INTO Votes (QuestionId, OptionNumber, UserId) " +
                      "VALUES (@QuestionId, @OptionNumber, @UserId)";

            var parameters = new
            {
                QuestionId = questionId,
                OptionNumber = option,
                UserId = userId
            };

            await _storeProcedureRepository.ExecuteAsync(sql, parameters, CommandType.Text);
        }
    }
}

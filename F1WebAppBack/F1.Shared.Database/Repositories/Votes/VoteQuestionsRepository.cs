using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Votes.Dtos;
using F1.Shared.Database.Repositories.Votes.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;
using System.Data;

namespace F1.Shared.Database.Repositories.Votes
{
    class VoteQuestionsRepository : IVoteQuestionsRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public VoteQuestionsRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task<long> CreateVoteQuestion(string question, IEnumerable<string> options, VotingStatus status)
        {
            const string sql = "INSERT INTO VoteQuestions (Question, CreateDate, State) VALUES (@Question, @CreateDate, @State); SELECT CAST(SCOPE_IDENTITY() as bigint);";
            var parameters = new
            {
                Question = question,
                CreateDate = DateTime.Now,
                State = (int)status
            };
            var id = await _storeProcedureRepository.ExecuteScalarAsync<long>(sql, parameters, CommandType.Text);
            return id;
        }


        public async Task DeleteVoteQuestion(long questionId)
        {
            var sql = $"DELETE FROM VoteQuestions WHERE Id = {questionId}";

            await _storeProcedureRepository.ExecuteAsync(sql, commandType: CommandType.Text);
        }

        public async Task<IVoteQuestion?> GetVoteQuestion(long questionId)
        {
            var dto = await _storeProcedureRepository.QueryFirstOrDefaultAsync<VoteQuestionsDto?>($"SELECT * FROM VoteQuestions WHERE Id = {questionId}", commandType: CommandType.Text);

            return dto?.ToDomain();
        }

        public async Task ChangeVoteStatus(long questionId, VotingStatus state)
        {
            var sql = $"UPDATE VoteQuestions SET State = {(int)state} WHERE Id = {questionId}";

            await _storeProcedureRepository.ExecuteAsync(sql, commandType: CommandType.Text);
        }

        public async Task<IEnumerable<IVoteQuestion>> GetAllVoteQuestions()
        {
            var dto = await _storeProcedureRepository.QueryAsync<VoteQuestionsDto>($"SELECT * FROM VoteQuestions order by 1 desc", commandType: CommandType.Text);

            return dto.Select(x => x.ToDomain()).ToList();
        }
    }
}

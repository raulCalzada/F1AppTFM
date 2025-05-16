using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Votes.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace F1.Shared.Database.Repositories.Votes
{
    class VoteOptionsRepository : IVoteOptionsRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public VoteOptionsRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task CreateVoteOption(long questionId, int option, string optionText)
        {
            var sql = "INSERT INTO VoteOptions (VoteQuestionId, OptionNumber, OptionText) " +
                      "VALUES (@QuestionId, @OptionNumber, @OptionText)";

            var parameters = new
            {
                QuestionId = questionId,
                OptionNumber = option,
                OptionText = optionText
            };

            await _storeProcedureRepository.ExecuteAsync(sql, parameters, CommandType.Text);
        }


        public async Task DeleteVoteOption(long questionId, int option)
        {
            var sql = "DELETE FROM VoteOptions WHERE VoteQuestionId = @QuestionId AND OptionNumber = @OptionNumber";
            var parameters = new
            {
                QuestionId = questionId,
                OptionNumber = option
            };
            await _storeProcedureRepository.ExecuteAsync(sql, parameters, CommandType.Text);
        }

        public Task<IEnumerable<string>> GetVoteOptions(long questionId)
        {
            var sql = "SELECT OptionText FROM VoteOptions WHERE VoteQuestionId = @QuestionId";
            var parameters = new
            {
                QuestionId = questionId
            };
            var options = _storeProcedureRepository.QueryAsync<string>(sql, parameters, CommandType.Text);
            return options;
        }
    }
}

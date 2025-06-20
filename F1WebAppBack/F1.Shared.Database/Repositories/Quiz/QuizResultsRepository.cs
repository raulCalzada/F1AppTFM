using System.Data;
using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Quiz.Dtos;
using F1.Shared.Database.Repositories.Quiz.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz
{
    public class QuizResultsRepository : IQuizResultsRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public QuizResultsRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task<IEnumerable<IQuizResult>> GetQuizResultsByQuizId(long quizId)
        {
            var resultsDto = await _storeProcedureRepository.QueryAsync<QuizResultsDto>(
                $"SELECT * FROM QuizResults WHERE QuizId = {quizId}", commandType: CommandType.Text);

            return resultsDto.Select(x => x.ToDomain()).ToList();
        }

        public async Task AddQuizResult(IQuizResult quizResult, long quizId)
        {
            var sql = "INSERT INTO QuizResults (UserId, QuizId, ScoreObtained) VALUES (@UserId, @QuizId, @ScoreObtained)";
            var parameters = new
            {
                UserId = quizResult.User.Id,
                QuizId = quizId,
                ScoreObtained = quizResult.ScoreObtained
            };

            await _storeProcedureRepository.ExecuteAsync(sql, parameters, CommandType.Text);
        }

        public async Task DeleteQuizResults(long quizId)
        {
            var sql = $"DELETE FROM QuizResults WHERE QuizId = {quizId}";
            await _storeProcedureRepository.ExecuteAsync(sql, commandType: CommandType.Text);
        }
    }
}

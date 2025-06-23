using System.Data;
using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Quiz.Dtos;
using F1.Shared.Database.Repositories.Quiz.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz
{
    public class QuizzesRepository : IQuizzesRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public QuizzesRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task<IEnumerable<IQuiz>> GetAllQuizzes()
        {
            var quizzesDto = await _storeProcedureRepository.QueryAsync<QuizzesDto>("SELECT * FROM Quizzes ORDER BY Id DESC",commandType: CommandType.Text);
            return quizzesDto.Select(x => x.ToDomain()).ToList();
        }

        public async Task<IQuiz?> GetQuizById(long id)
        {
            var quiz = await _storeProcedureRepository.QueryFirstOrDefaultAsync<QuizzesDto>($"SELECT * FROM Quizzes WHERE Id = {id}",commandType: CommandType.Text);
            return quiz?.ToDomain();
        }

        public async Task<IQuiz?> GetQuizByTitle(string title)
        {
            var quiz = await _storeProcedureRepository.QueryFirstOrDefaultAsync<QuizzesDto>($"SELECT * FROM Quizzes WHERE Title = '{title}'", CommandType.Text);

            return quiz?.ToDomain();
        }

        public async Task CreateQuiz(IQuiz quiz)
        {
            var sql = "INSERT INTO Quizzes (Title, Subtitle, TotalScore) VALUES (@Title, @Subtitle, @TotalScore)";
            var parameters = new
            {
                Title = quiz.Title,
                Subtitle = quiz.Description,
                TotalScore = quiz.TotalScore
            };

            await _storeProcedureRepository.ExecuteAsync(sql, parameters, CommandType.Text);
        }

        public async Task DeleteQuiz(long id)
        {
            var sql = $"DELETE FROM Quizzes WHERE Id = {id}";
            await _storeProcedureRepository.ExecuteAsync(sql, commandType: CommandType.Text);
        }
    }
}

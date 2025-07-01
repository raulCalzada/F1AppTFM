using System.Data;
using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Quiz.Dtos;
using F1.Shared.Database.Repositories.Quiz.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz
{
    public class QuizQuestionsRepository : IQuizQuestionsRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public QuizQuestionsRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task<IEnumerable<IQuizQuestion>> GetAllQuizQuestionsByQuizId(long quizId)
        {
            var questionsDto = await _storeProcedureRepository.QueryAsync<QuizQuestionsDto>(
                $"SELECT * FROM QuizQuestions WHERE QuizId = {quizId}", commandType: CommandType.Text);

            return questionsDto.Select(x => x.ToDomain()).ToList();
        }

        public async Task<IQuizQuestion> GetQuizQuestionById(long id)
        {
            var questionDto = await _storeProcedureRepository.QueryFirstOrDefaultAsync<QuizQuestionsDto>(
                $"SELECT * FROM QuizQuestions WHERE Id = {id}", commandType: CommandType.Text);

            return questionDto?.ToDomain() ?? throw new Exception("QuizQuestion not found.");
        }

        public async Task CreateQuizQuestion(IQuizQuestion quizQuestion, long quizId)
        {
            var sql = "INSERT INTO QuizQuestions (QuizId, Text, CorrectAnswerId) VALUES (@QuizId, @Text, @CorrectAnswerId)";
            var parameters = new
            {
                QuizId = quizId,
                Text = quizQuestion.Text,
                CorrectAnswerId = quizQuestion.CorrectSelectedAnswerId
            };

            await _storeProcedureRepository.ExecuteAsync(sql, parameters, CommandType.Text);
        }

        public async Task UpdateQuizQuestion(IQuizQuestion quizQuestion, long quizId)
        {
            var sql = "UPDATE QuizQuestions SET Text = @Text, CorrectAnswerId = @CorrectAnswerId WHERE Id = @Id AND QuizId = @QuizId";
            var parameters = new
            {
                Id = quizQuestion.Id,
                QuizId = quizId,
                Text = quizQuestion.Text,
                CorrectAnswerId = quizQuestion.CorrectSelectedAnswerId
            };

            await _storeProcedureRepository.ExecuteAsync(sql, parameters, CommandType.Text);
        }

        public async Task DeleteQuizQuestionsByQuizId(long quizId)
        {
            await _storeProcedureRepository.ExecuteAsync(
                $"DELETE FROM QuizQuestions WHERE QuizId = {quizId}", commandType: CommandType.Text);
        }
    }
}

using System.Data;
using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Quiz.Dtos;
using F1.Shared.Database.Repositories.Quiz.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz
{
    public class QuizAnswersRepository : IQuizAnswersRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public QuizAnswersRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task<IQuizAnswer?> GetQuizAnswerById(long id)
        {
            var answerDto = await _storeProcedureRepository.QueryFirstOrDefaultAsync<QuizAnswersDto>(
                $"SELECT * FROM QuizAnswers WHERE Id = {id}", commandType: CommandType.Text);

            return answerDto?.ToDomain();
        }

        public async Task<IEnumerable<IQuizAnswer>?> GetQuizAnswersByQuizQuestionId(long quizQuestionId)
        {
            var answersDto = await _storeProcedureRepository.QueryAsync<QuizAnswersDto>(
                $"SELECT * FROM QuizAnswers WHERE QuestionId = {quizQuestionId}", commandType: CommandType.Text);

            return answersDto.Select(x => x.ToDomain()).ToList();
        }

        public async Task CreateQuizAnswer(IQuizAnswer quizAnswer, long quizQuestionId)
        {
            var sql = "INSERT INTO QuizAnswers (QuestionId, Text) VALUES (@QuestionId, @Text)";
            var parameters = new
            {
                QuestionId = quizQuestionId,
                Text = quizAnswer.Text
            };

            await _storeProcedureRepository.ExecuteAsync(sql, parameters, CommandType.Text);
        }

        public async Task DeleteQuizAnswer(long quizId)
        {
            var sql = $"DELETE FROM QuizAnswers WHERE QuestionId = {quizId}";
            await _storeProcedureRepository.ExecuteAsync(sql, commandType: CommandType.Text);
        }
    }
}

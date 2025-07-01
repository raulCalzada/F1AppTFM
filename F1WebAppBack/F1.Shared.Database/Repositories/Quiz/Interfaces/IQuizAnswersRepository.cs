using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz.Interfaces;

public interface IQuizAnswersRepository
{
    Task<IQuizAnswer?> GetQuizAnswerById(long id);
    Task<IEnumerable<IQuizAnswer>?> GetQuizAnswersByQuizQuestionId(long quizQuestionId);
    Task CreateQuizAnswer(IQuizAnswer quizAnswer, long quizQuestionId);
    Task DeleteQuizAnswer(long quizId);
}

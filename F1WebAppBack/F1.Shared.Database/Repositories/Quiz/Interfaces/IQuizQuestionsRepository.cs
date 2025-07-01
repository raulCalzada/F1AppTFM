using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Quiz.Interfaces;

public interface IQuizQuestionsRepository
{
    Task<IEnumerable<IQuizQuestion>> GetAllQuizQuestionsByQuizId(long quizId);
    Task<IQuizQuestion> GetQuizQuestionById(long id);
    Task CreateQuizQuestion(IQuizQuestion quizQuestion, long quizId);
    Task UpdateQuizQuestion(IQuizQuestion quizQuestion, long quizId);
    Task DeleteQuizQuestionsByQuizId(long quizId);   
}

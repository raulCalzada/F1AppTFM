using System;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.Services.Interfaces;

public interface IQuizServices
{
    Task CreateQuiz(IQuiz quiz);
    Task<IQuiz> GetQuizById(long quizId);
    Task<IQuiz> GetQuizByTitle(string title);
    Task<IEnumerable<IQuiz>> GetAllQuizzes();
    Task DeleteQuiz(long quizId);
}

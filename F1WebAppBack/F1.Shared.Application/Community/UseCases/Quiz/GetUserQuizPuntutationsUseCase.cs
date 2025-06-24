using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.UseCases.Quiz;

public class GetUserQuizPuntutationsUseCase : IGetUserQuizPuntutationsUseCase
{
    private readonly IQuizServices _quizServices;

    public GetUserQuizPuntutationsUseCase(IQuizServices quizServices)
    {
        _quizServices = quizServices;
    }

    public async Task<IEnumerable<IQuiz>> GetUserQuizzes(long userId)
    {
        var quizzes = await _quizServices.GetAllQuizzes() ?? throw new InvalidOperationException("No quizzes found");

        foreach (var quiz in quizzes)
        {
            var userResult = quiz.UserResults.FirstOrDefault(ur => ur.User.Id.Equals(userId));
            if (userResult != null)
            {
                quiz.ScoreReceived = userResult.ScoreObtained;
            }
            else
            {
                quiz.ScoreReceived = null; 
            }
        }
        return quizzes;
    }
}

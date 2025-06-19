using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.CommunityService.Endpoints.Quiz.GetUserQuizPuntutations.Reponse;

public class GetUserQuizPuntuationsResponse
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public int? ScoreObtained { get; set; }

    public GetUserQuizPuntuationsResponse(IQuiz quiz)
    {
        Title = quiz.Title;
        Description = quiz.Description;
        IsCompleted = quiz.UserResults.Any();
        ScoreObtained = quiz.UserResults?.FirstOrDefault()?.ScoreObtained;
    }
}

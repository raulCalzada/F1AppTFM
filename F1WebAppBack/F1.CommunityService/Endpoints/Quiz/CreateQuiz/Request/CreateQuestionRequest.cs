namespace F1.CommunityService.Endpoints.Quiz.CreateQuiz.Request;

public class CreateQuestionRequest
{
    public string QuestionText { get; set; } = string.Empty;
    public string CorrectAnswer { get; set; } = string.Empty;
    public List<string> Answers { get; set; } = [];
}

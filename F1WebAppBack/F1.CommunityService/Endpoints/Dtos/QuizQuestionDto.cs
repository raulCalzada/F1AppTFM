namespace F1.CommunityService.Endpoints.Dtos;

public class QuizQuestionDto
{
    public long QuestionId { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public List<string> Answers { get; set; } = [];
}

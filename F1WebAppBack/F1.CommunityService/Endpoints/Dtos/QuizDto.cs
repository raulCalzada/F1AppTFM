using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.CommunityService.Endpoints.Dtos;

public class QuizDto
{
    public long QuizId { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public string CorrectAnswer { get; set; } = string.Empty;
    public List<QuizQuestionDto> Questions { get; set; } = [];
    public List<QuizUsersPuntuations> UsersDone { get; set; } = [];

    public QuizDto(IQuiz quiz)
    {
        QuizId = quiz.Id;
        QuestionText = quiz.Title;
        CorrectAnswer = quiz.Description;
        Questions = quiz.Questions.Select(q => new QuizQuestionDto
        {
            QuestionId = q.Id,
            QuestionText = q.Text,
            Answers = q.Answers.Select(a => a.Text).ToList()
        }).ToList();

        UsersDone = quiz.UserResults.Select(r => new QuizUsersPuntuations
        {
            UserId = r.User.Id,
            Puntuation = r.ScoreObtained
        }).ToList();
    }
}

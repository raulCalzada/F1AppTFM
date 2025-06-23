using F1.Shared.Domain.Comunity.Entities;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.CommunityService.Endpoints.Quiz.CreateQuiz.Request;

public class CreateQuizRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<CreateQuestionRequest> Questions { get; set; } = [];
    public int TotalScore { get; set; }

    public IQuiz ToDomain()
    {
        var questions = new List<QuizQuestion>();

        foreach (var quest in this.Questions)
        {
            var answers = new List<QuizAnswer>();

            foreach (var ans in quest.Answers)
            {
                answers.Add(new QuizAnswer
                {
                    Text = ans
                });
            }

            questions.Add(new QuizQuestion
            {
                Text = quest.QuestionText,
                CorrectSelectedAnswer = quest.CorrectAnswer,
                Answers = answers
            });
        }

        return new Shared.Domain.Comunity.Entities.Quiz
        {
            Title = this.Title,
            Description = this.Description,
            Questions = questions,
            TotalScore = this.TotalScore
        };
    }
}

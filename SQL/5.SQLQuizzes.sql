-- Main table for quizzes
CREATE TABLE Quizzes (
    Id BIGINT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Subtitle NVARCHAR(255),
    TotalScore INT NOT NULL
);

-- Table for quiz questions
CREATE TABLE QuizQuestions (
    Id BIGINT PRIMARY KEY IDENTITY(1,1),
    QuizId BIGINT NOT NULL,
    Text NVARCHAR(1000) NOT NULL,
    CorrectAnswerId BIGINT, -- Will be linked to QuizAnswers.Id after insert

    CONSTRAINT FK_QuizQuestions_Quizzes FOREIGN KEY (QuizId) REFERENCES Quizzes(Id)
);

-- Table for possible answers
CREATE TABLE QuizAnswers (
    Id BIGINT PRIMARY KEY IDENTITY(1,1),
    QuestionId BIGINT NOT NULL,
    Text NVARCHAR(1000) NOT NULL,

    CONSTRAINT FK_QuizAnswers_Questions FOREIGN KEY (QuestionId) REFERENCES QuizQuestions(Id)
);

-- Table for storing each user's quiz result
CREATE TABLE QuizResults (
    Id BIGINT PRIMARY KEY IDENTITY(1,1),
    UserId BIGINT NOT NULL,
    QuizId BIGINT NOT NULL,
    ScoreObtained INT NOT NULL,

    CONSTRAINT FK_QuizResults_Quizzes FOREIGN KEY (QuizId) REFERENCES Quizzes(Id)
    CONSTRAINT FK_QuizResults_Users FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- Table creation (already exists)
IF DB_ID('F1AppDB') IS NULL
    CREATE DATABASE F1AppDB;
GO
USE F1AppDB;
GO

-- Main table for quizzes
CREATE TABLE Quizzes (
    Id BIGINT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Subtitle NVARCHAR(255),
    TotalScore INT
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

    CONSTRAINT FK_QuizResults_Quizzes FOREIGN KEY (QuizId) REFERENCES Quizzes(Id),
    CONSTRAINT FK_QuizResults_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

-- Insert Quiz 1
INSERT INTO Quizzes (Title, Subtitle, TotalScore)
VALUES ('Formula 1 Legends', 'Test your knowledge about legendary drivers', 100);
DECLARE @Quiz1Id BIGINT = SCOPE_IDENTITY();

INSERT INTO QuizQuestions (QuizId, Text) VALUES
(@Quiz1Id, 'Who has won the most Formula 1 World Championships?'),
(@Quiz1Id, 'Which driver was known as "The Professor"?'),
(@Quiz1Id, 'Which country is Juan Manuel Fangio from?'),
(@Quiz1Id, 'Who was Ayrton Senna’s main rival during the late 1980s?'),
(@Quiz1Id, 'In which year did Michael Schumacher win his first F1 title?'),
(@Quiz1Id, 'Which team did Lewis Hamilton debut with in F1?'),
(@Quiz1Id, 'How many titles did Sebastian Vettel win with Red Bull Racing?');

DECLARE @Q1 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz1Id AND Text = 'Who has won the most Formula 1 World Championships?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q1, 'Ayrton Senna'),
(@Q1, 'Lewis Hamilton'),
(@Q1, 'Michael Schumacher'),
(@Q1, 'Max Verstappen');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q1 AND Text = 'Lewis Hamilton') WHERE Id = @Q1;

DECLARE @Q2 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz1Id AND Text = 'Which driver was known as "The Professor"?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q2, 'Alain Prost'),
(@Q2, 'Nelson Piquet'),
(@Q2, 'Jackie Stewart');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q2 AND Text = 'Alain Prost') WHERE Id = @Q2;

DECLARE @Q3 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz1Id AND Text = 'Which country is Juan Manuel Fangio from?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q3, 'Spain'),
(@Q3, 'Argentina'),
(@Q3, 'Brazil');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q3 AND Text = 'Argentina') WHERE Id = @Q3;

DECLARE @Q4 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz1Id AND Text = 'Who was Ayrton Senna’s main rival during the late 1980s?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q4, 'Alain Prost'),
(@Q4, 'Nigel Mansell'),
(@Q4, 'Gerhard Berger');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q4 AND Text = 'Alain Prost') WHERE Id = @Q4;

DECLARE @Q5 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz1Id AND Text = 'In which year did Michael Schumacher win his first F1 title?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q5, '1991'),
(@Q5, '1994'),
(@Q5, '1996'),
(@Q5, '1998');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q5 AND Text = '1994') WHERE Id = @Q5;

DECLARE @Q6 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz1Id AND Text = 'Which team did Lewis Hamilton debut with in F1?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q6, 'Mercedes'),
(@Q6, 'Red Bull'),
(@Q6, 'McLaren'),
(@Q6, 'Williams');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q6 AND Text = 'McLaren') WHERE Id = @Q6;

DECLARE @Q7 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz1Id AND Text = 'How many titles did Sebastian Vettel win with Red Bull Racing?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q7, '2'),
(@Q7, '3'),
(@Q7, '4'),
(@Q7, '5');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q7 AND Text = '4') WHERE Id = @Q7;


-- Insert Quiz 2
INSERT INTO Quizzes (Title, Subtitle, TotalScore)
VALUES ('F1 Circuits and Races', 'Do you know the most iconic tracks in F1 history?', 100);
DECLARE @Quiz2Id BIGINT = SCOPE_IDENTITY();

INSERT INTO QuizQuestions (QuizId, Text) VALUES
(@Quiz2Id, 'Which track features the famous Eau Rouge corner?'),
(@Quiz2Id, 'Which Grand Prix is held at Monza?'),
(@Quiz2Id, 'Where is the Suzuka Circuit located?'),
(@Quiz2Id, 'Which circuit was added to the F1 calendar in 2008?'),
(@Quiz2Id, 'Which city hosts the Australian Grand Prix?'),
(@Quiz2Id, 'Which track is the fastest on the current calendar?');

DECLARE @Q8 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz2Id AND Text = 'Which track features the famous Eau Rouge corner?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q8, 'Silverstone'),
(@Q8, 'Monza'),
(@Q8, 'Spa-Francorchamps'),
(@Q8, 'Red Bull Ring');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q8 AND Text = 'Spa-Francorchamps') WHERE Id = @Q8;

DECLARE @Q9 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz2Id AND Text = 'Which Grand Prix is held at Monza?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q9, 'Italian GP'),
(@Q9, 'San Marino GP'),
(@Q9, 'Hungarian GP');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q9 AND Text = 'Italian GP') WHERE Id = @Q9;

DECLARE @Q10 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz2Id AND Text = 'Where is the Suzuka Circuit located?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q10, 'Japan'),
(@Q10, 'China'),
(@Q10, 'South Korea');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q10 AND Text = 'Japan') WHERE Id = @Q10;

DECLARE @Q11 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz2Id AND Text = 'Which circuit was added to the F1 calendar in 2008?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q11, 'Baku City Circuit'),
(@Q11, 'Marina Bay Street Circuit'),
(@Q11, 'Sochi Autodrom'),
(@Q11, 'Miami International Autodrome');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q11 AND Text = 'Marina Bay Street Circuit') WHERE Id = @Q11;

DECLARE @Q12 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz2Id AND Text = 'Which city hosts the Australian Grand Prix?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q12, 'Melbourne'),
(@Q12, 'Sydney'),
(@Q12, 'Perth');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q12 AND Text = 'Melbourne') WHERE Id = @Q12;

DECLARE @Q13 BIGINT = (SELECT Id FROM QuizQuestions WHERE QuizId = @Quiz2Id AND Text = 'Which track is the fastest on the current calendar?');
INSERT INTO QuizAnswers (QuestionId, Text) VALUES
(@Q13, 'Silverstone'),
(@Q13, 'Monza'),
(@Q13, 'Jeddah Street Circuit'),
(@Q13, 'Spa-Francorchamps');
UPDATE QuizQuestions SET CorrectAnswerId = (SELECT Id FROM QuizAnswers WHERE QuestionId = @Q13 AND Text = 'Monza') WHERE Id = @Q13;


-- Quiz 1 Results
INSERT INTO QuizResults (UserId, QuizId, ScoreObtained) VALUES 
(4, 1, 80), 
(6, 1, 90), 
(8, 1, 70),

-- Quiz 2 Results
(6, 2, 95), 
(9, 2, 85);
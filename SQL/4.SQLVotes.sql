-- Forum Threads and Comments

-- Table creation (already exists)
IF DB_ID('F1AppDB') IS NULL
    CREATE DATABASE F1AppDB;
GO
USE F1AppDB;
GO

-- Forum schema (already exists)
-- [ForumThread and ForumThreadComment creation]

-- Existing forum data
-- [INSERTS for ForumThread and ForumThreadComment]

-- Voting system schema
CREATE TABLE VoteQuestions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Question NVARCHAR(MAX) NOT NULL,
    CreateDate DATETIME NULL,
    State INT NOT NULL
);

CREATE TABLE VoteOptions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    VoteQuestionId INT NOT NULL,
    OptionNumber INT NOT NULL,
    OptionText NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (VoteQuestionId) REFERENCES VoteQuestions(Id) ON DELETE CASCADE
);

CREATE TABLE Votes (
    Id INT PRIMARY KEY IDENTITY(1,1),
    QuestionId INT NOT NULL,
    OptionNumber INT NOT NULL,
    UserId INT NOT NULL,
    FOREIGN KEY (QuestionId) REFERENCES VoteQuestions(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);

-- Voting questions
INSERT INTO VoteQuestions (Question, CreateDate, State) VALUES
('Who will win the next F1 Grand Prix?', GETDATE(), 1),
('Which team will dominate the season?', GETDATE(), 1),
('Which rookie impressed you the most?', GETDATE(), 1),
('Should F1 increase the number of sprint races?', GETDATE(), 1),
('What''s your favorite GP on the calendar?', GETDATE(), 1),
('Which driver has the best racecraft?', GETDATE(), 1),
('Do you support a team budget cap increase?', GETDATE(), 1),
('What''s the most iconic F1 car of all time?', GETDATE(), 1),
('Do you think Audi will succeed in F1 by 2026?', GETDATE(), 1),
('Should Monaco remain on the calendar?', GETDATE(), 1);

-- Voting options
INSERT INTO VoteOptions (VoteQuestionId, OptionNumber, OptionText) VALUES
-- Q1
(1, 1, 'Max Verstappen'), (1, 2, 'Lewis Hamilton'), (1, 3, 'Charles Leclerc'),
-- Q2
(2, 1, 'Red Bull'), (2, 2, 'Mercedes'), (2, 3, 'Ferrari'),
-- Q3
(3, 1, 'Oliver Bearman'), (3, 2, 'Theo Pourchaire'), (3, 3, 'Zane Maloney'),
-- Q4
(4, 1, 'Yes'), (4, 2, 'No'), (4, 3, 'Only a few'),
-- Q5
(5, 1, 'Monza'), (5, 2, 'Spa'), (5, 3, 'Suzuka'),
-- Q6
(6, 1, 'Fernando Alonso'), (6, 2, 'Lewis Hamilton'), (6, 3, 'Max Verstappen'),
-- Q7
(7, 1, 'Yes'), (7, 2, 'No'),
-- Q8
(8, 1, 'McLaren MP4/4'), (8, 2, 'Ferrari F2004'), (8, 3, 'Mercedes W11'),
-- Q9
(9, 1, 'Yes'), (9, 2, 'No'), (9, 3, 'Too soon to tell'),
-- Q10
(10, 1, 'Yes'), (10, 2, 'No');

-- Votes
INSERT INTO Votes (QuestionId, OptionNumber, UserId) VALUES
-- Q1
(1, 1, 3), (1, 2, 4), (1, 3, 5), (1, 1, 6), (1, 2, 7), (1, 3, 8),
-- Q2
(2, 1, 3), (2, 2, 4), (2, 3, 5), (2, 1, 6), (2, 2, 7), (2, 3, 8),
-- Q3
(3, 1, 4), (3, 2, 5), (3, 3, 6), (3, 1, 7), (3, 2, 8), (3, 3, 9),
-- Q4
(4, 1, 3), (4, 2, 4), (4, 3, 5), (4, 1, 6), (4, 2, 7), (4, 3, 10),
-- Q5
(5, 1, 4), (5, 2, 5), (5, 3, 6), (5, 1, 7), (5, 2, 8), (5, 3, 9),
-- Q6
(6, 1, 3), (6, 2, 4), (6, 3, 5), (6, 1, 6), (6, 2, 7), (6, 3, 10),
-- Q7
(7, 1, 4), (7, 2, 5), (7, 1, 6), (7, 2, 7), (7, 1, 8), (7, 2, 9),
-- Q8
(8, 1, 3), (8, 2, 4), (8, 3, 5), (8, 1, 6), (8, 2, 7), (8, 3, 9),
-- Q9
(9, 1, 3), (9, 2, 4), (9, 3, 5), (9, 1, 6), (9, 2, 7), (9, 3, 10),
-- Q10
(10, 1, 3), (10, 2, 4), (10, 1, 5), (10, 2, 6), (10, 1, 7), (10, 2, 8);
GO


-- CREATE VoteQuestions TABLE
CREATE TABLE VoteQuestions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Question NVARCHAR(MAX) NOT NULL,
    CreateDate DATETIME NULL,
    State INT NOT NULL -- Voting status as integer
);

-- CREATE VoteOptions TABLE
CREATE TABLE VoteOptions (
    Id INT PRIMARY KEY IDENTITY(1,1),
    VoteQuestionId INT NOT NULL,
    OptionNumber INT NOT NULL,
    OptionText NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (VoteQuestionId) REFERENCES VoteQuestions(Id) ON DELETE CASCADE
);

-- CREATE Votes TABLE
CREATE TABLE Votes (
    Id INT PRIMARY KEY IDENTITY(1,1),
	QuestionId INT NOT NULL,
    OptionNumber INT NOT NULL,
    UserId INT NOT NULL,
	FOREIGN KEY (QuestionId) REFERENCES VoteQuestions(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);

-- INSERTS FOR VoteQuestions TABLE
INSERT INTO VoteQuestions (Question, CreateDate, State) VALUES
('Who will win the next F1 Grand Prix?', GETDATE(), 1),
('Which team will dominate the season?', GETDATE(), 1);

-- INSERTS FOR VoteOptions TABLE
INSERT INTO VoteOptions (VoteQuestionId, OptionNumber, OptionText) VALUES
(1, 1, 'Max Verstappen'),
(1, 2, 'Lewis Hamilton'),
(1, 3, 'Charles Leclerc'),
(2, 1, 'Red Bull Racing'),
(2, 2, 'Mercedes-AMG Petronas'),
(2, 3, 'Ferrari');

-- INSERTS FOR Votes TABLE
INSERT INTO Votes (QuestionId, OptionNumber, UserId) VALUES
(1, 1, 3),
(1, 1, 4),
(1, 3, 5),
(2, 1, 6),
(2, 2, 3),
(2, 3, 4);

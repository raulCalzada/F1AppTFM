CREATE TABLE ForumThread (
    ThreadId INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Title NVARCHAR(150) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    AuthorUserId INT NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE() NOT NULL,
    FOREIGN KEY (AuthorUserId) REFERENCES Users(UserId)
);
GO


CREATE TABLE ForumThreadComment (
    Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    AuthorUserId INT NOT NULL,
	ThreadId INT NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE() NOT NULL,
    FOREIGN KEY (AuthorUserId) REFERENCES Users(UserId),
	FOREIGN KEY (ThreadId) REFERENCES ForumThread(ThreadId)
);
GO


INSERT INTO ForumThread (Title, Content, AuthorUserId) VALUES
('Can Red Bull Keep Dominating in the 2025 Season?', 'With Red Bull absolutely crushing the 2024 season, do you think they can maintain their dominance in 2025? Or will Ferrari and Mercedes catch up with their upgrades?', 3),
('Who Will Be the Next Young F1 Superstar?', 'Now that some of the older drivers are nearing retirement, who do you think will be the next young star to shine in Formula 1?', 4),
('Best Overtake of the 2024 Season', 'There were some incredible overtakes this season. Which one do you think was the best? My pick is Norris passing Sainz in Monaco – absolute perfection.', 5),
('2026 F1 Calendar – Which Races Are You Most Excited For?', 'The new F1 calendar has just been announced, and there are some interesting new circuits. Which ones are you looking forward to the most?', 6);

INSERT INTO ForumThreadComment (Content, AuthorUserId, ThreadId) VALUES
('I think it depends a lot on whether the FIA introduces new regulations. Red Bull has been on top with the aero package, but Ferrari is rumored to be working on a game-changing power unit.', 4, 1),
('Mercedes has the resources to bounce back. They were close to Red Bull at the end of the season. It will come down to who can manage tire degradation better.', 5, 1),
('I am still rooting for McLaren. They had a great run in the last few races. If they keep developing at this pace, they could surprise everyone.', 6, 1),
('Oscar Piastri is definitely one to watch. The guy has been super consistent this season. Reminds me a bit of a young Alonso.', 7, 2),
('I think Alex Palou deserves a shot. He dominated IndyCar and could make the transition like Montoya did back in the day.', 8, 2),
('Don''t sleep on Theo Pourchaire. The kid has shown some real potential in F2. If he gets a good seat in F1, he could be a threat.', 3, 2),
('Russell''s double overtake in Hungary was absolutely insane. He took both Ferraris in one move. Brilliant racecraft.', 4, 3),
('I''d say Verstappen''s pass on Hamilton in Brazil. That outside line was so risky but he nailed it.', 5, 3),
('Honestly, Alonso''s defense against Leclerc in Spain was just as impressive as any overtake. The guy is a master of positioning.', 6, 3),
('The return of Kyalami is huge! I can''t wait to see F1 cars blasting through those corners.', 7, 4),
('The Las Vegas night race is going to be wild. The atmosphere will be electric, and the long straight is perfect for DRS.', 8, 4),
('I''m curious to see how the new Qatar circuit will play out. It looks super fast, but overtaking might be tricky.', 3, 4);

-- Forum Threads and Comments

-- Table creation (already exists)
IF DB_ID('F1AppDB') IS NULL
    CREATE DATABASE F1AppDB;
GO
USE F1AppDB;
GO

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

-- Insert initial threads
INSERT INTO ForumThread (Title, Content, AuthorUserId) VALUES
('Can Red Bull Keep Dominating in the 2025 Season?', 'With Red Bull absolutely crushing the 2024 season, do you think they can maintain their dominance in 2025? Or will Ferrari and Mercedes catch up with their upgrades?', 3),
('Who Will Be the Next Young F1 Superstar?', 'Now that some of the older drivers are nearing retirement, who do you think will be the next young star to shine in Formula 1?', 4),
('Best Overtake of the 2024 Season', 'There were some incredible overtakes this season. Which one do you think was the best? My pick is Norris passing Sainz in Monaco – absolute perfection.', 5),
('2026 F1 Calendar – Which Races Are You Most Excited For?', 'The new F1 calendar has just been announced, and there are some interesting new circuits. Which ones are you looking forward to the most?', 6),
('Which Rookie Impressed You the Most This Season?', 'From Oliver Bearman to Zane Maloney, the 2025 rookies had a lot to prove. Who exceeded your expectations?', 10),
('Technical Innovations: Which Team Surprised You the Most?', 'Many teams brought experimental parts this year. Which innovation do you think gave the biggest advantage?', 11),
('Is it Time for a Sprint Race Format Change?', 'Some fans love it, some hate it. What are your thoughts on changing the sprint format for next year?', 12),
('Will 2025 Be Hamilton''s Last Season?', 'Speculation is growing around Hamilton''s future. Do you think he''ll retire after this season?', 13),
('Can Audi Make a Competitive Entry in 2026?', 'With Audi preparing to join the grid, how likely is it that they''ll compete at the front right away?', 14),
('Is the Budget Cap Really Leveling the Field?', 'We''re two years into the cost cap era. Are we seeing more competitiveness or the same dominance by top teams?', 15),
('What''s the Most Underrated Circuit on the Calendar?', 'Everyone talks about Monaco and Spa, but which circuit do you think doesn''t get the recognition it deserves?', 16),
('Should F1 Consider a Team Salary Cap?', 'Driver salaries are excluded from the cost cap. Should the FIA consider regulating that too?', 17);

-- Insert initial comments
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
('I''m curious to see how the new Qatar circuit will play out. It looks super fast, but overtaking might be tricky.', 3, 4),
('Bearman really impressed in tough conditions. Not easy to adapt that quickly.', 13, 5),
('Maloney showed great racecraft. He deserves a seat next year.', 14, 5),
('RB’s new rear diffuser surprised everyone. Great idea to break the dirty air cycle.', 15, 6),
('Aston Martin''s rear wing tests looked promising. Could be a big change next year.', 16, 6),
('Sprint races feel rushed. Maybe a reverse grid could spice things up?', 17, 7),
('They need to find a better way to balance risk and reward in sprints.', 18, 7),
('I think Hamilton still has a lot to offer. His experience is unmatched.', 6, 8),
('If he wins one more title, it would be a perfect time to retire on top.', 5, 8),
('Audi won''t mess around. Their WEC background proves they know how to build a top car.', 4, 9),
('I''m skeptical. It usually takes years to catch up in F1.', 8, 9),
('Smaller teams like Alfa and Haas are doing better. I think the cap is working.', 9, 10),
('Red Bull is still dominating, so it''s not perfect yet.', 10, 10),
('I love Suzuka, but I feel like Baku is the most underrated. Always chaotic and fun.', 11, 11),
('Zandvoort has a great atmosphere, and the banking is so unique.', 12, 11),
('Salaries are part of team power. Capping them could make driver moves more strategic.', 13, 12),
('That might scare away big names, though.', 14, 12);
GO

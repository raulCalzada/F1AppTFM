-- Crear tabla News
CREATE TABLE News (
    ArticleId INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Title NVARCHAR(150) NOT NULL,
    Subtitle NVARCHAR(250) NULL,
    Content NVARCHAR(MAX) NOT NULL,
    ImageUrl1 NVARCHAR(500) NULL,
    ImageUrl2 NVARCHAR(500) NULL,
    AuthorUserId INT NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE() NOT NULL,
    FOREIGN KEY (AuthorUserId) REFERENCES Users(UserId)
);
GO

-- Crear tabla NewsComments
CREATE TABLE NewsComments (
    CommentId INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    UserId INT NOT NULL,
    ArticleId INT NOT NULL,
    Comment NVARCHAR(1000) NOT NULL,
    CreateDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (ArticleId) REFERENCES News(ArticleId)
);
GO

-- Insert example articles into News
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES
(
    'Fernando Alonso dominates the Monaco GP',
    'The Spanish driver leads from start to finish',
    'Fernando Alonso has once again proven why he is one of the most talented drivers on the grid with a masterful performance on the historic Monaco street circuit. From the start, the Aston Martin driver set a blistering pace that none of his rivals could match. The team executed a flawless pit strategy, stopping at the perfect moment to avoid traffic and maintain the lead. Over the 78 laps, Alonso managed his tyres, race pace, and changing track conditions with surgical precision. This victory marks an iconic moment in his career and establishes him as a serious contender for the world title. Fans were thrilled with every lap, and the final podium was a true celebration for the green team, signaling Aston Martin’s competitive resurgence in Formula 1.',
    'https://cdn-5.motorsport.com/images/amp/YW7e15DY/s1000/podio-segundo-lugar-fernando-a.jpg',
    'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2023/05/fernando-alonso-monaco-boxes-3044520.jpg?tf=3840x',
    1,
	'2025-03-02 10:30:00'
),
(
    'Ferrari introduces aerodynamic upgrades for Silverstone',
    'Leclerc confident in a performance boost',
    'Ferrari has unveiled a new aerodynamic package ahead of the British Grand Prix at the iconic Silverstone circuit. According to the team’s technical director, these updates aim to improve airflow efficiency over the car and increase downforce in high-speed corners—one of the SF-24’s known weaknesses this season. Charles Leclerc has expressed optimism about the changes, stating that the team has worked extensively in the simulator to adapt quickly to the new components. These upgrades come at a crucial point in the championship, as Ferrari needs to close the gap to Red Bull and Mercedes in the Constructors’ standings. Fans are eagerly awaiting to see if the Scuderia’s improvements translate to on-track performance this weekend.',
    'https://example.com/images/ferrari1.jpg',
    NULL,
    2,
	'2025-03-03 10:30:00'
),
(
    '2025’s new tyres: Revolution or challenge for teams?',
    'Pirelli’s revamped compounds spark uncertainty across the paddock',
    'The 2025 Formula 1 season has kicked off with a major technical change: the introduction of new tyre compounds by Pirelli. These tyres, structurally harder but with redesigned intermediate compounds, aim to reduce overheating without compromising grip. However, several teams have reported difficulties in reaching the optimal temperature window, especially during qualifying. Teams like McLaren and Alpine have had to drastically tweak their setups, including suspension settings, minimum pressures, and tyre warm-up strategies. Moreover, the new tyres affect the car’s balance in high-speed corners, forcing aerodynamic adjustments to compensate for traction loss during corner exit. Pirelli argues the change is necessary for sustainability and durability, but some drivers remain unconvinced. Time will tell whether this shift enhances the racing spectacle or introduces unnecessary complications.',
    'https://example.com/images/neumaticos2025.jpg',
    'https://example.com/images/pirelli-techlab.jpg',
    2,
	'2025-03-04 10:30:00'
),
(
    'FIA explores new aero packages to boost overtaking',
    'Ground effect could see major changes next season',
    'Looking ahead to 2026, the FIA has begun working on a revision of the technical regulations that could reshape how F1 cars generate downforce. While the return of ground effect in 2022 did reduce dirty air, overtaking remains a challenge at high-downforce circuits. Current proposals include simplifying the front wing endplate design, minimizing diffuser-generated vortices, and revising the minimum ride height. Some teams support limiting floor edge aero devices to prevent the lead car from disrupting the airflow of the chaser. The FIA is also considering a redesigned DRS system or even more sophisticated active aero technology. While still in the simulation phase, this package could usher in a new era of cleaner, more strategic, and more exciting wheel-to-wheel racing.',
    'https://example.com/images/aerodinamica-adelantamientos.jpg',
    'https://example.com/images/f1-tech-regs-2026.jpg',
    1,
	'2025-03-05 10:30:00'
);




INSERT INTO NewsComments (UserId, ArticleId, Comment, CreateDate) VALUES
(4, 1, 'Amazing race by Fernando, he didn’t make a single mistake!', '2025-03-02 10:30:00'),
(5, 1, 'Red Bull is on another level this season, but it was not enough...', '2025-03-02 10:31:00'),
(5, 2, 'Hopefully these upgrades give Ferrari a real chance.', '2025-03-03 10:30:00'),
(4, 2, 'Leclerc needs consistency more than technical upgrades.', '2025-03-03 10:31:00'),
(3, 3, 'The new C3 compound has a stiffer construction that completely changes how heat is distributed through the carcass. If the team doesn’t adapt the cold pressure properly, it could lose temperature before the stint.', '2025-03-04 10:30:00'),
(6, 3, 'What worries me most is that the new compounds are penalizing teams with lower downforce. If they can’t warm them up quickly, they’ll keep struggling in the early laps of each stint.', '2025-03-04 11:30:00'),
(5, 3, 'Strategically, this could benefit teams that already mastered thermal management, like Red Bull. In long stints, the new design reduces graining, but it makes fast laps in quali more difficult.', '2025-03-04 12:30:00'),
(6, 4, 'Reducing front wing complexity is key. The amount of vortices currently generated still affects the following car’s stability beyond 10 meters.', '2025-03-05 10:30:00'),
(3, 4, 'The key lies in the floor. If they remove the sealing edges that create lateral downforce, grip can be maintained without ruining clean airflow for the car behind.', '2025-03-05 11:30:00'),
(5, 4, 'An interesting solution would be active DRS on both front and rear wings, controlled by the FIA in specific zones. Similar to what’s been tested in Formula E.', '2025-03-05 12:30:00');
GO


CREATE PROCEDURE CreateNews
    @Title NVARCHAR(150),
    @Subtitle NVARCHAR(250),
    @Content NVARCHAR(MAX),
    @ImageUrl1 NVARCHAR(500),
    @ImageUrl2 NVARCHAR(500),
    @AuthorUserId INT
AS
BEGIN
    INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
    VALUES (@Title, @Subtitle, @Content, @ImageUrl1, @ImageUrl2, @AuthorUserId, GETDATE());
END;
GO


CREATE PROCEDURE UpdateNews
    @ArticleId INT,
    @Title NVARCHAR(150),
    @Subtitle NVARCHAR(250),
    @Content NVARCHAR(MAX),
    @ImageUrl1 NVARCHAR(500),
    @ImageUrl2 NVARCHAR(500)
AS
BEGIN
    UPDATE News
    SET Title = @Title,
        Subtitle = @Subtitle,
        Content = @Content,
        ImageUrl1 = @ImageUrl1,
        ImageUrl2 = @ImageUrl2
    WHERE ArticleId = @ArticleId;
END;
GO


CREATE PROCEDURE CreateNewsComment
    @UserId INT,
    @ArticleId INT,
    @Comment NVARCHAR(1000),
	@CreateDate DATETIME
AS
BEGIN
    INSERT INTO NewsComments (UserId, ArticleId, Comment, CreateDate)
    VALUES (@UserId, @ArticleId, @Comment, @CreateDate);
END;
GO


CREATE PROCEDURE UpdateNewsComment
    @CommentId INT,
    @Comment NVARCHAR(1000)
AS
BEGIN
    UPDATE NewsComments
    SET Comment = @Comment
    WHERE CommentId = @CommentId;
END;
GO
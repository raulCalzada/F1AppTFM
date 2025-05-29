IF DB_ID('F1AppDB') IS NULL
    CREATE DATABASE F1AppDB;
GO
USE F1AppDB;
GO

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
),
('Red Bull unveils new front suspension innovation', 'Verstappen says it connects him better with the car', 'During practice in Suzuka, Red Bull introduced a new front suspension system designed to improve corner stability. Engineers claim it reduces tire wear by up to 12%.', 'https://example.com/images/redbull-suspension.jpg', NULL, 1, '2025-03-06 09:00:00'),
('Mercedes back on podium after wind tunnel fix', 'Russell: "We understand the car better now"', 'After several races off the podium, Mercedes improved performance by correcting data from their wind tunnel. Adjustments to the diffuser and rear wing restored the balance of W15.', 'https://example.com/images/mercedes-w15.jpg', NULL, 2, '2025-03-07 14:00:00'),
('McLaren signs young talent for 2026 season', 'Piastri renewed, and a rookie could join', 'McLaren has extended Oscar Piastri’s contract and is rumored to be eyeing the reigning F2 champion as a second driver. The team continues its focus on young talent.', 'https://example.com/images/mclaren-piastri.jpg', 'https://example.com/images/f2-rookie.jpg', 1, '2025-03-08 10:00:00'),
('FIA considers changes to post-race penalties', 'Should time penalties be applied after the flag?', 'The FIA is evaluating whether to apply time penalties post-race to allow for better review. Teams are concerned about losing positions due to late rulings.', 'https://example.com/images/fia-debate.jpg', NULL, 2, '2025-03-09 13:30:00'),
('Alpine secures best finish of the season at Spa', 'Gasly lands impressive fourth place', 'Pierre Gasly impressed with a flawless one-stop strategy at Spa, giving Alpine its best result in 2025.', 'https://example.com/images/alpine-gasly.jpg', NULL, 1, '2025-03-10 15:45:00'),
('Aston Martin tests adjustable rear wing', 'Is the tech ready for 2026?', 'The team ran a new adjustable rear wing system. Though still in testing, it may be approved for use by 2026.', 'https://example.com/images/aston-rearwing.jpg', NULL, 2, '2025-03-11 11:30:00'),
('Carlos Sainz reportedly in talks with Audi F1', 'Spanish driver may switch for 2026', 'Sources close to Sainz report ongoing negotiations with Audi, who are set to enter F1 as a full works team.', 'https://example.com/images/sainz-audi.jpg', NULL, 1, '2025-03-12 16:00:00'),
('Mexico GP contract extended through 2030', 'A fan-favorite remains on the calendar', 'F1 has extended the Mexico GP through 2030, ensuring the vibrant event remains a fixture on the calendar.', 'https://example.com/images/gp-mexico.jpg', NULL, 2, '2025-03-13 18:00:00'),
('Zhou Guanyu scores first points of 2025 season', 'Strong wet-weather performance in Hungary', 'Zhou scored valuable points in a rain-affected race at Hungaroring, showing strong pace and consistency.', 'https://example.com/images/zhou-rain.jpg', NULL, 1, '2025-03-14 12:00:00');





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
(5, 4, 'An interesting solution would be active DRS on both front and rear wings, controlled by the FIA in specific zones. Similar to what’s been tested in Formula E.', '2025-03-05 12:30:00'),
(4, 5, 'Amazing tech from Red Bull. No one is catching them this season.', '2025-03-06 10:00:00'),
(6, 5, 'This suspension is a game-changer in fast corners.', '2025-03-06 10:10:00'),
(5, 5, 'Mercedes better come up with something quick.', '2025-03-06 10:30:00'),
(7, 5, 'Verstappen is unstoppable with this kind of innovation.', '2025-03-06 10:45:00'),
(9, 5, 'Is this even legal? FIA should look into it.', '2025-03-06 11:00:00'),
(10, 5, 'They’re always pushing the limits – respect.', '2025-03-06 11:15:00'),
(3, 6, 'Finally, Mercedes looks competitive again.', '2025-03-07 15:00:00'),
(5, 6, 'Russell is outdriving expectations.', '2025-03-07 15:20:00'),
(8, 7, 'Piastri has huge potential. Smart move.', '2025-03-08 11:00:00'),
(4, 7, 'I hope they don’t rush a rookie into F1.', '2025-03-08 11:15:00'),
(6, 7, 'McLaren’s youth project is paying off.', '2025-03-08 11:30:00'),
(7, 8, 'Post-race penalties? That’s too chaotic.', '2025-03-09 14:00:00'),
(5, 8, 'FIA needs to be more consistent.', '2025-03-09 14:30:00'),
(6, 9, 'Gasly nailed it. Top drive.', '2025-03-10 16:00:00'),
(9, 9, 'That one-stop gamble paid off.', '2025-03-10 16:20:00'),
(4, 10, 'Is active aero even legal?', '2025-03-11 12:00:00'),
(3, 10, 'F1 needs more innovation like this.', '2025-03-11 12:15:00'),
(6, 11, 'Sainz to Audi? That would be epic.', '2025-03-12 17:00:00'),
(7, 11, 'It makes sense, especially with Ferrari not renewing.', '2025-03-12 17:15:00'),
(8, 12, 'The Mexico GP is one of the best – glad it’s staying.', '2025-03-13 19:00:00'),
(10, 12, 'Fans there bring amazing energy.', '2025-03-13 19:20:00'),
(5, 13, 'Zhou deserved those points – great in the wet.', '2025-03-14 13:00:00'),
(4, 13, 'Strong performance by Sauber.', '2025-03-14 13:15:00');
GO
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
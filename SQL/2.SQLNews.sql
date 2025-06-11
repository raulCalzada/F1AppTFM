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
-- Red Bull
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES (
  'Red Bull unveils new front suspension innovation',
  'Verstappen says it connects him better with the car',
  'During practice in Suzuka, Red Bull introduced a new front suspension system designed to improve corner stability. Engineers claim it reduces tire wear by up to 12%, enhancing grip in long stints and supporting better tyre management across the race weekend.

This innovation comes as part of Red Bull’s ongoing focus on maximizing the RB20’s performance window. The suspension tweaks, reportedly inspired by rally-car setups, enable the car to remain flatter under braking and provide quicker steering response through tight corners.

Verstappen praised the change, stating that he feels more confident on turn-in, particularly in medium-speed sequences. The team hopes this improvement will cement their dominance, especially on technical circuits like Monaco and Hungary.',
  'https://cdn-8.motorsport.com/images/amp/YBe5wnW2/s1000/red-bull-racing-rb20-technisch-2.jpg',
  NULL,
  13,
  '2025-03-06 09:00:00'
);

-- Mercedes
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES (
  'Mercedes back on podium after wind tunnel fix',
  'Russell: "We understand the car better now"',
  'After several disappointing races off the podium, Mercedes has bounced back with a significant improvement in car performance. The breakthrough came after the team identified and corrected a calibration error in their wind tunnel, which had skewed data on airflow under the floor.

By refining the diffuser shape and rear wing profile, engineers achieved greater rear-end stability. These changes allowed both Russell and Hamilton to push more confidently during corner exits, leading to a much-improved balance in high-speed turns.

George Russell expressed renewed confidence in the W15, saying the car now reacts more predictably. With better correlation between simulation and real-world data, Mercedes appears poised to re-enter the title fight.',
  'https://images.ctfassets.net/1fvlg6xqnm65/49MrvkcbHneGq0lUD6Olvn/69780be3aa7a3255d689850508f2ba63/03-Baku_2022_3.jpg?w=3840&q=75&fm=webp',
  'https://d2n9h2wits23hf.cloudfront.net/image/v1/static/6057949432001/9cc98cf1-c5a7-4f15-bee5-e53755de1d0c/79c881d7-9ad9-4e9b-8898-0a1188d72674/432x243/match/image.jpg',
  12,
  '2025-03-07 14:00:00'
);

-- McLaren
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES (
  'McLaren signs young talent for 2026 season',
  'Piastri renewed, and a rookie could join',
  'McLaren has extended Oscar Piastri’s contract through 2026, securing one of the grid’s most promising young drivers. Team principal Andrea Stella emphasized the Australian’s strong work ethic and rapid adaptation as key factors in the renewal.

In addition, the team is rumored to be scouting the reigning Formula 2 champion, signaling a continued focus on youth and development. Insiders suggest McLaren sees this pairing as a long-term investment that will pay off during the next regulation cycle.

With this move, McLaren aims to consolidate its resurgence and challenge consistently for podiums. The team believes that its driver lineup will be crucial in extracting performance from the evolving technical package expected in 2026.',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCYSG4UF4GEOXE_oKwwsL67TyNjYqwijyAtw&s',
  'https://example.com/images/f2-rookie.jpg',
  13,
  '2025-03-08 10:00:00'
);

-- FIA
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES (
  'FIA considers changes to post-race penalties',
  'Should time penalties be applied after the flag?',
  'The FIA is evaluating a proposal to apply time penalties *after* races, rather than during them, allowing stewards more time to review incidents with complete data. The goal is to prioritize accuracy over speed in decision-making.

Some teams have voiced concern, arguing that such delays can compromise the integrity of live race outcomes. Others support the change, believing it could reduce the pressure on stewards and avoid hasty rulings.

The measure is still in the discussion phase, but it highlights the FIA’s broader effort to modernize race governance. If implemented, it may mark a new era of post-race analysis and retrospective adjustments.',
  'https://img.asmedia.epimg.net/resizer/v2/YPRIPQBB6VAAPJJZZW3R4U4BWU.jpg?auth=ca14aa39acda98f1b2be26f81aa26f9b9272a2b7695e581010e722d693410e80&width=1472&height=828&smart=true',
  NULL,
  12,
  '2025-03-09 13:30:00'
);

-- Alpine
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES (
  'Alpine secures best finish of the season at Spa',
  'Gasly lands impressive fourth place',
  'Pierre Gasly delivered a stellar drive at Spa-Francorchamps, finishing fourth with a well-executed one-stop strategy. The Alpine driver showed consistent pace and excellent tyre management throughout the race.

Team engineers attributed the result to a new energy recovery calibration that allowed more aggressive deployment on the long straights. Gasly overtook key midfield rivals and defended brilliantly in the final laps.

This marks Alpine’s best result of the 2025 season and boosts morale heading into the summer break. With upgrades planned for Monza, the team hopes to build on this momentum.',
  'https://cdn-6.motorsport.com/images/amp/YP3MLPo2/s6/pierre-gasly-alpine-a523-1.jpg',
  NULL,
  13,
  '2025-03-10 15:45:00'
);

-- Aston Martin
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES (
  'Aston Martin tests adjustable rear wing',
  'Is the tech ready for 2026?',
  'Aston Martin is testing an adjustable rear wing system designed to dynamically alter downforce depending on the car’s speed and cornering profile. This development aims to give drivers more control during key overtaking and defensive scenarios, especially on circuits with long straights.

While still in the experimental stage, early simulations show promising gains in drag reduction and improved tyre longevity. FIA observers have monitored the sessions closely, as such innovations would require rule adaptations before being legalized for race use.

If approved, this system could be a game-changer for 2026, aligning with F1’s push toward active aerodynamics. The paddock awaits official feedback, but the buzz around Aston Martin’s garage hints at a breakthrough.',
  'https://d3cm515ijfiu6w.cloudfront.net/wp-content/uploads/2022/11/23091915/aston-martin-banned-as-of-2023-rear-wing-planetf1.jpg',
  NULL,
  12,
  '2025-03-11 11:30:00'
);

-- Carlos Sainz / Audi
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES (
  'Carlos Sainz reportedly in talks with Audi F1',
  'Spanish driver may switch for 2026',
  'Carlos Sainz is reportedly in advanced negotiations with Audi ahead of their official Formula 1 entry as a works team in 2026. The move could reunite Sainz with former engineers from his time at Toro Rosso and McLaren, forming a solid foundation for Audi’s debut campaign.

While no official statement has been released, sources indicate that Audi values Sainz’s experience and technical feedback. His consistent performance with Ferrari makes him a top candidate to lead a new project requiring both speed and development input.

Audi’s entry is highly anticipated, and securing a driver of Sainz’s caliber would signal serious intent. If confirmed, the Spanish driver could be at the center of one of the biggest shifts in the F1 grid.',
  'https://www.motor16.com/wp-content/webpc-passthru.php?src=https://www.motor16.com/wp-content/uploads/2024/01/Carlos-Sainz-Sr.s-Audi-e-tron-Drive-Sparks-F1-Transfer-Talk-for-Carlos-Sainz-Jr.-Image-1024x576-1.jpg&nocache=1',
  NULL,
  11,
  '2025-03-12 16:00:00'
);

-- Mexico GP
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES (
  'Mexico GP contract extended through 2030',
  'A fan-favorite remains on the calendar',
  'Formula 1 has officially confirmed the extension of the Mexican Grand Prix through 2030, securing the future of one of the sport’s most vibrant and culturally rich events. The Autódromo Hermanos Rodríguez, known for its electric atmosphere and stadium section, continues to be a favorite among drivers and fans alike.

Race organizers have promised new sustainability initiatives and facility upgrades, including expanded grandstands and a modernized paddock area. These changes aim to enhance the experience for spectators while aligning with F1’s environmental goals.

The extension is seen as a win for the Latin American fan base, which has grown significantly in recent years. With Sergio Pérez continuing to draw local support, the Mexico GP remains a highlight on the calendar.',
  'https://e00-us-marca.uecdn.es/assets/multimedia/imagenes/2023/10/25/16982501528348.jpg',
  NULL,
  12,
  '2025-03-13 18:00:00'
);

-- Zhou Guanyu
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES (
  'Zhou Guanyu scores first points of 2025 season',
  'Strong wet-weather performance in Hungary',
  'Zhou Guanyu scored his first points of the 2025 season with a commanding drive in difficult wet conditions at the Hungaroring. The Chinese driver showcased great skill and composure as he navigated changing grip levels and strategic pit stops.

Alfa Romeo opted for an early switch to intermediates, allowing Zhou to undercut several midfield competitors. His defensive driving in the closing laps, particularly against faster cars on slicks, earned praise from the paddock.

With this result, Zhou not only boosted team morale but also reaffirmed his place in the lineup amid rumors of incoming young talent. His rain-soaked drive proved that experience and cool-headedness can make the difference when chaos reigns.',
  'https://wallpapersok.com/images/hd/guanyu-zhou-racing-through-the-rain-r0w821gx6xv7y835.jpg',
  NULL,
  13,
  '2025-03-14 12:00:00'
);
INSERT INTO News (Title, Subtitle, Content, ImageUrl1, ImageUrl2, AuthorUserId, CreateDate)
VALUES
(
  'FIA explores new aero packages to boost overtaking',
  'Ground effect could see major changes next season',
  'Looking ahead to 2026, the FIA has begun working on a significant revision of the technical regulations aimed at improving overtaking. While the reintroduction of ground effect in 2022 helped reduce turbulent air, it hasn’t fully solved the difficulties drivers face when following closely on high-downforce tracks. The latest discussions focus on simplifying front wing endplates, minimizing the role of floor-generated vortices, and modifying the ride height minimum to optimize car balance during duels.

In addition, proposals are being considered to limit the use of extreme floor edge aero components that can disrupt the airflow of pursuing cars. Another major idea on the table is a redesigned DRS system, or potentially, an entirely new active aerodynamic concept that reacts to race conditions in real-time. These technologies are still in development, but teams have already begun running simulations to prepare for the potential changes.

Stakeholders across the paddock are cautiously optimistic. Some engineers see it as a much-needed evolution to increase race quality, while others warn that greater complexity may only benefit top-budget teams. The FIA insists this is a collaborative effort, and hopes to finalize the 2026 aero rules by the end of the year after simulation validations and consultation rounds.',
  'https://tecnicaf1.wordpress.com/wp-content/uploads/2011/12/img_01.jpg?w=640',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsknu4FMxRwwQ7ZRQkm4dW92_RMXD-3OkR_Q&s',
  11,
  '2025-04-28 10:30:00'
),
(
  '2025’s new tyres: Revolution or challenge for teams?',
  'Pirelli’s revamped compounds spark uncertainty across the paddock',
  'The 2025 Formula 1 season opened with one of the most discussed technical shifts in recent memory: a brand-new range of Pirelli tyre compounds. These new constructions are structurally stiffer but use reformulated intermediates to reduce overheating during long stints. The goal is to create a more durable and consistent product for both qualifying and race scenarios, though initial team feedback has been mixed at best.

Some teams, including Alpine and McLaren, reported difficulty reaching the ideal temperature window, especially during cooler FP1 and FP2 sessions. This has led to widespread setup changes — such as higher suspension preload, lower pressures, and changes to camber angles — in a bid to activate the tyres quickly without sacrificing high-speed balance. Additionally, several drivers complained of unpredictable grip loss at corner exits and increased sliding under traction.

Despite these early setbacks, Pirelli maintains that the new compounds are essential for long-term sustainability, with reduced degradation being a key priority. While the full impact of these tyres will become clearer as the calendar progresses, the early uncertainty adds a new layer of strategic intrigue. Fans and analysts alike will be watching closely to see how teams adapt their philosophies throughout the year.',
  'https://upload.wikimedia.org/wikipedia/commons/1/18/Pirelli_Tire_Range_%2852849596009%29.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC6MuG3nL44T3NO4irzSTCL6fG9mlSGt1YIQ&s',
  12,
  '2025-04-29 10:30:00'
),
(
  'Ferrari introduces aerodynamic upgrades for Silverstone',
  'Leclerc confident in a performance boost',
  'Ferrari has introduced a comprehensive aerodynamic update package ahead of the British Grand Prix, aiming to address the SF-24’s recurring instability at high speed. The new design includes a reshaped front wing with more efficient outwash characteristics, revised bargeboards, and a modified floor profile to enhance ground effect consistency through sweeping corners.

Charles Leclerc spoke positively about the changes, noting improved response during simulation runs and a better overall feeling through Silverstone’s fast sections like Maggots and Becketts. Engineers believe the new aero map improves front-to-rear balance without compromising braking stability — a long-standing issue on tighter tracks.

With Red Bull and Mercedes continuing to dominate the Constructors’ standings, Ferrari hopes these developments will help them close the gap heading into the second half of the season. Team principal Frédéric Vasseur emphasized that this is part of a broader plan, with additional cooling and weight-saving updates planned for Spa and Monza.',
  'https://www.amalgamcollection.com/cdn/shop/products/DSCF9105_1d2ebdca-f962-45a6-825d-a619199d8ceb_grande.jpg?v=1717769464',
  NULL,
  12,
  '2025-04-30 10:30:00'
),
(
  'Fernando Alonso dominates the Monaco GP',
  'The Spanish driver leads from start to finish',
  'Fernando Alonso delivered a textbook performance at the Monaco Grand Prix, leading every lap from pole to claim a historic win on the iconic street circuit. From the moment the lights went out, Alonso controlled the race with a combination of aggressive yet precise driving and unmatched tyre preservation. The Aston Martin driver was untouchable throughout, responding calmly to pressure from behind and executing every sector with perfection.

The team’s strategy was equally flawless — opting for an early undercut that allowed Alonso to avoid traffic and control the pace. Even as rain threatened in the final stages, Alonso managed the changing conditions expertly, keeping the car on the dry line and preserving his lead. Team radio messages revealed a calm and focused approach, a stark contrast to the chaos seen in the midfield.

This result marks one of Alonso’s most dominant performances in years and positions Aston Martin as a legitimate threat in the Constructors’ battle. The win also sparked celebrations in the paddock and across Spain, reigniting hopes that the two-time world champion could mount a late-season title challenge. Monaco 2025 will surely be remembered as a masterclass in racecraft and determination.',
  'https://cdn-5.motorsport.com/images/amp/YW7e15DY/s1000/podio-segundo-lugar-fernando-a.jpg',
  'https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2023/05/fernando-alonso-monaco-boxes-3044520.jpg?tf=3840x',
  13,
  '2025-05-01 10:30:00'
);





INSERT INTO NewsComments (UserId, ArticleId, Comment, CreateDate) VALUES
(4, 1, 'Amazing tech from Red Bull. No one is catching them this season.', '2025-03-06 10:00:00'),
(6, 1, 'This suspension is a game-changer in fast corners.', '2025-03-06 10:10:00'),
(5, 1, 'Mercedes better come up with something quick.', '2025-03-06 10:30:00'),
(7, 1, 'Verstappen is unstoppable with this kind of innovation.', '2025-03-06 10:45:00'),
(9, 1, 'Is this even legal? FIA should look into it.', '2025-03-06 11:00:00'),
(10, 1, 'They’re always pushing the limits – respect.', '2025-03-06 11:15:00'),
(3, 2, 'Finally, Mercedes looks competitive again.', '2025-03-07 15:00:00'),
(5, 2, 'Russell is outdriving expectations.', '2025-03-07 15:20:00'),
(8, 3, 'Piastri has huge potential. Smart move.', '2025-03-08 11:00:00'),
(4, 3, 'I hope they don’t rush a rookie into F1.', '2025-03-08 11:15:00'),
(6, 3, 'McLaren’s youth project is paying off.', '2025-03-08 11:30:00'),
(7, 4, 'Post-race penalties? That’s too chaotic.', '2025-03-09 14:00:00'),
(5, 4, 'FIA needs to be more consistent.', '2025-03-09 14:30:00'),
(6, 5, 'Gasly nailed it. Top drive.', '2025-03-10 16:00:00'),
(9, 5, 'That one-stop gamble paid off.', '2025-03-10 16:20:00'),
(4, 6, 'Is active aero even legal?', '2025-03-11 12:00:00'),
(3, 6, 'F1 needs more innovation like this.', '2025-03-11 12:15:00'),
(6, 7, 'Sainz to Audi? That would be epic.', '2025-03-12 17:00:00'),
(7, 7, 'It makes sense, especially with Ferrari not renewing.', '2025-03-12 17:15:00'),
(8, 8, 'The Mexico GP is one of the best – glad it’s staying.', '2025-03-13 19:00:00'),
(10, 8, 'Fans there bring amazing energy.', '2025-03-13 19:20:00'),
(5, 9, 'Zhou deserved those points – great in the wet.', '2025-03-14 13:00:00'),
(4, 9, 'Strong performance by Sauber.', '2025-03-14 13:15:00'),
(4, 13, 'Amazing race by Fernando, he didn’t make a single mistake!', '2025-03-02 10:30:00'),
(5, 13, 'Red Bull is on another level this season, but it was not enough...', '2025-03-02 10:31:00'),
(5, 12, 'Hopefully these upgrades give Ferrari a real chance.', '2025-03-03 10:30:00'),
(4, 12, 'Leclerc needs consistency more than technical upgrades.', '2025-03-03 10:31:00'),
(3, 11, 'The new C3 compound has a stiffer construction that completely changes how heat is distributed through the carcass. If the team doesn’t adapt the cold pressure properly, it could lose temperature before the stint.', '2025-03-04 10:30:00'),
(6, 11, 'What worries me most is that the new compounds are penalizing teams with lower downforce. If they can’t warm them up quickly, they’ll keep struggling in the early laps of each stint.', '2025-03-04 11:30:00'),
(5, 11, 'Strategically, this could benefit teams that already mastered thermal management, like Red Bull. In long stints, the new design reduces graining, but it makes fast laps in quali more difficult.', '2025-03-04 12:30:00'),
(6, 10, 'Reducing front wing complexity is key. The amount of vortices currently generated still affects the following car’s stability beyond 10 meters.', '2025-03-05 10:30:00'),
(3, 10, 'The key lies in the floor. If they remove the sealing edges that create lateral downforce, grip can be maintained without ruining clean airflow for the car behind.', '2025-03-05 11:30:00'),
(5, 10, 'An interesting solution would be active DRS on both front and rear wings, controlled by the FIA in specific zones. Similar to what’s been tested in Formula E.', '2025-03-05 12:30:00');
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
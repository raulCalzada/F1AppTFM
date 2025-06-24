import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { HistoricalTeams } from '../pages/historical/historicalTeams/HistoricalTeams';
import { HistoricalRaceCalendar } from '../pages/historical/historicalraceCalendar/HistoricalRaceCalendar';
import { RaceResult } from '../pages/common/raceResult/RaceResult';
import { Teams } from '../pages/actual/teams/Teams';
import { Drivers } from '../pages/actual/drivers/Drivers';
import { HistoricalDrivers } from '../pages/historical/historicarDrivers/HistoricalDrivers';
import { ActualRaceCalendar } from '../pages/actual/calendar/ActualRaceCalendar';
import { ActualMenu } from '../pages/actual/menu/ActualMenu';
import { HistoricalPuntuations } from '../pages/historical/historicalPuntuations/HistoricalPuntuations';
import { RaceDetailedInfo } from '../pages/actual/raceDetailedInfo/RaceDetailedInfo';
import { Standings } from '../pages/actual/standings/Standings';
import { HistoricalStandings } from '../pages/historical/historicalStandings/HistoricalStandings';
import { Puntuations } from '../pages/actual/puntuations/Puntuations';
import { LoginPage } from '../pages/community/login/LoginPage';
import { RegisterPage } from '../pages/community/register/RegisterPage';
import { AdminForum } from '../pages/community/admin/forum/AdminForum';
import { UsersAdmin } from '../pages/community/admin/users/UsersAdmin';
import { SettingsAdmin } from '../pages/community/admin/settings/SettingsAdmin';
import { CommunityMenu } from '../pages/community/user/menu/CommunityMenu';
import { ForumList } from '../pages/community/user/forum/forumList/ForumList';
import { ForumPost } from '../pages/community/user/forum/forumThread/ForumThread';
import { NewsList } from '../pages/community/user/news/newList/NewsList';
import { Article } from '../pages/community/user/news/article/Article';
import { MenuWriter } from '../pages/community/writer/menu/MenuWriter';
import { ListNewsWriter } from '../pages/community/writer/listNews/ListNewsWriter';
import { CreateNewWriter } from '../pages/community/writer/createNew/CreateNewWriter';
import { ListNewsAdmin } from '../pages/community/admin/news/ListNewsAdmin';
import { MenuAdmin } from '../pages/community/admin/menu/MenuAdmin';
import { Votes } from '../pages/community/user/votes/Votes';
import { QuizList } from '../pages/community/user/quizzes/quizList/QuizList';
import { QuizDetail } from '../pages/community/user/quizzes/quiz/QuizDetail';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/historical/drivers" element={<HistoricalDrivers />} />
                <Route path="/historical/teams" element={<HistoricalTeams />} />
                <Route path="/historical/calendar" element={<HistoricalRaceCalendar />} />
                <Route path="/historical/puntuations" element={<HistoricalPuntuations />} />
                <Route path="/historical/standings" element={< HistoricalStandings/>} />
                <Route path="/race-info/:raceId/:year" element={<RaceResult />} />

                <Route path="/actual" element={<ActualMenu />} />
                <Route path="/actual/teams" element={<Teams />} />
                <Route path="/actual/drivers" element={<Drivers />} />
                <Route path="/actual/calendar" element={<ActualRaceCalendar />} />
                <Route path="/actual/nextRace" element={< RaceDetailedInfo/>} />
                <Route path="/actual/standings" element={< Standings/>} />
                <Route path="/actual/puntuations" element={< Puntuations/>} />
                
                { /* Community User Routes */ }
                <Route path="/community/menu" element={<CommunityMenu />} />
                <Route path="/community/forum" element={< ForumList/>} />
                <Route path="/community/forum/:forumId" element={<ForumPost />} />  
                <Route path="/community/news" element={<NewsList />} /> 
                <Route path="/community/news/:newId" element={<Article />} /> 
                <Route path="/community/votings" element={<Votes />} /> 
                <Route path="/community/quiz" element={<QuizList />} /> 
                <Route path="/community/quiz/:quizId" element={<QuizDetail />} /> 


                { /* Community Admin Routes */ }
                <Route path="/community/admin/menu" element={<MenuAdmin />} />
                <Route path="/community/admin/forum" element={<AdminForum />} />
                <Route path="/community/admin/users" element={< UsersAdmin/>} />
                <Route path="/community/admin/settings" element={< SettingsAdmin/>} />    
                <Route path="/community/admin/news" element={< ListNewsAdmin/>} /> 

                { /* Community Writer Routes */ }
                <Route path="/community/writer/menu" element={<MenuWriter/>} />         
                <Route path="/community/writer/news" element={<ListNewsWriter/>} />     
                <Route path="/community/writer/news/create" element={<CreateNewWriter/>} /> 

                <Route path="/community/login" element={<LoginPage />} />
                <Route path="/community/register" element={<RegisterPage />} />
                
                
            </Routes>
        </BrowserRouter>
    )
}
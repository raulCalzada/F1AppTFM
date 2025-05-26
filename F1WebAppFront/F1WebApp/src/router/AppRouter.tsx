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
import { CommunityMenu } from '../pages/community/menu/CommunityMenu';
import { LoginPage } from '../pages/community/login/LoginPage';
import { RegisterPage } from '../pages/community/register/RegisterPage';
import { MenuAdmin } from '../pages/community/admin/menu/menuAdmin';


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
                
                <Route path="/community/menu" element={<CommunityMenu />} />

                <Route path="/community/admin/menu" element={<MenuAdmin />} />
                

                <Route path="/community/login" element={<LoginPage />} />
                <Route path="/community/register" element={<RegisterPage />} />

                
            </Routes>
        </BrowserRouter>
    )
}
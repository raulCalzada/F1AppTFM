import { useEffect, useState } from "react";
import { yearsList } from "../../../common/common";
import { useRace } from "../../../hooks/useRace";
import { ToastPosition, toast } from "react-toastify";
import "./HistoricalRaceCalentar.css"

import { Race } from "../../../types/race";
import { useNavigate } from 'react-router-dom';
import { MainContainerHistorical } from "../../../common/historicalContainerLayout/MainContainerHistorical";



export const HistoricalRaceCalendar: React.FC = () => {

    const [yearSelected, setYearSelected] = useState<number>(2023);
    const navigate = useNavigate();

    const {
        raceList,
        getRaceList,
        raceStatus
    } = useRace();

    useEffect(() => {
        getRaceList(yearSelected.toString());
    }, []);

    useEffect(() => {
        getRaceList(yearSelected.toString());
    }, [yearSelected]);

    useEffect(() => {
        if (raceStatus.loading && raceStatus.message !== '') {
            toast.loading(raceStatus.message, {
                position: "bottom-center" as ToastPosition,
            });
        }
        if (raceStatus.success && raceStatus.message !== '') {
            toast.success(raceStatus.message, {
                position: "bottom-center" as ToastPosition,
            });
        }
        if (raceStatus.loading && raceStatus.message !== '') {
            toast.error(raceStatus.message, {
                position: "bottom-center" as ToastPosition,
            });
        }
    }, [raceStatus]);

    const seeRaceInfo = (race: Race, year: number) => {
        navigate(`/race-info/${race.round}/${year}`);
        alert(`Has seleccionado la carrera ${race.raceName} en ${race.Circuit.circuitName} el año ${year}`);
    };


    return (
        <MainContainerHistorical>
            <h1 className="calendar-title">Race Calendar</h1>
            <select className="year-dropdown" value={yearSelected} onChange={(e) => setYearSelected(Number(e.target.value))}
            >
                {yearsList.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <div className="race-list">
            {raceList.map((race) => (
                    <div key={race.round} className="race-item"
                    onClick={() => seeRaceInfo(race, yearSelected)}>
                        <h2>{race.Circuit.circuitName}</h2>
                        <div className="race-season">{race.season}</div>
                        <div className="race-name">{race.raceName}</div>
                        <div className="race-round">Round {race.round}</div>
                        <h2>{race.date}</h2>
                    </div>
                ))}
            </div>
        </MainContainerHistorical>
    );
};
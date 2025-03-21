import { useEffect, useState } from "react";
import { useRace } from "../../../hooks/useRace";
import { ToastPosition, toast } from "react-toastify";
import "./ActualRaceCalendar.css";
import backgroundImage from "../../../assets/prueba2.png";
import { useNavigate } from 'react-router-dom';
import { MainContainerActual } from "../../../common/actualMainContainer/MainContainerActual";
import { Race } from "../../../types/race";

export const ActualRaceCalendar: React.FC = () => {
    const navigate = useNavigate();
    const [thisYear] = useState(new Date().getFullYear());
    const [currentDate] = useState(new Date());

    const {
        raceList,
        getRaceList,
        raceStatus
    } = useRace();

    useEffect(() => {
        getRaceList(thisYear.toString());
    }, []); 

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
        if (raceStatus.error && raceStatus.message !== '') {
            toast.error(raceStatus.message, {
                position: "bottom-center" as ToastPosition,
            });
        }
    }, [raceStatus]);

    const seeRaceInfo = (race: Race) => {
        const raceDate = new Date(race.date);
        if (raceDate >= currentDate) {
            return;
        }
        navigate(`/race-info/${race.round}/${thisYear}`);
        alert(`Has seleccionado la carrera ${race.raceName} en ${race.Circuit.circuitName} el año ${thisYear}`);
    };

    return (
        <MainContainerActual>
            <div className="calendar-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h1 className="title">Race Calendar</h1>
                
                <div className="race-list">
                    {raceList.map((race) => {
                        const raceDate = new Date(race.date);
                        const isFutureRace = raceDate >= currentDate;
                        return (
                            <div key={race.round} 
                                className={`race-item ${isFutureRace ? "disabled" : ""}`}
                                onClick={() => seeRaceInfo(race)}>
                                <h2>{race.Circuit.circuitName}</h2>
                                <div className="race-season">{race.season}</div>
                                <div className="race-name">{race.raceName}</div>
                                <div className="race-round">Round {race.round}</div>
                                <h2>{race.date}</h2>
                                {isFutureRace && <div className="disabled-overlay">❌</div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </MainContainerActual>
    );
};

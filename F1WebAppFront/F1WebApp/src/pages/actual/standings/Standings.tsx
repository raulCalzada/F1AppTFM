import { MainContainerActual } from "../../../common/actualMainContainer/MainContainerActual";
import backgroundImage from "../../../assets/actualRace.png";
import { useState, useEffect } from "react";
import { useStandings } from "../../../hooks/useStandings";
import "./Standings.css";


export const Standings: React.FC = () => {
    const { driversStandings, constructorsStandings, getDriverStandingsInAYear, getConstructorStandingsInAYear } = useStandings();

    const [championship, setChampionship] = useState<string>("drivers");

    useEffect(() => {
        if (championship === "drivers") {
            getDriverStandingsInAYear(new Date().getFullYear().toString());
        } else {
            getConstructorStandingsInAYear(new Date().getFullYear().toString());
        }
    }, [championship, getDriverStandingsInAYear, getConstructorStandingsInAYear]);

    const labels = championship === "drivers" ? ["Position", "Driver", "Points", "Wins"] : ["Position", "Constructor", "Points", "Wins"];

    const data = championship === "drivers"
        ? driversStandings.map((standing) => [
            `${standing.Driver.givenName} ${standing.Driver.familyName}`,
            standing.points,
            standing.wins
        ])
        : constructorsStandings.map((standing) => [
            standing.Constructor.name,
            standing.points,
            standing.wins
        ]);

    return (
        <MainContainerActual>
            <div className="standings-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h1 className="title">Standings</h1>
                <div className="filter-container">     
                    <div className="filter">
                        <label className="filter-label">CHAMPIONSHIP</label>
                        <select
                            className="year-dropdown"
                            value={championship}
                            onChange={(e) => setChampionship(e.target.value)}
                        >
                            <option value="drivers">Drivers</option>
                            <option value="constructors">Constructors</option>
                        </select>
                    </div>
                </div>
                <div className="standings-table">
                    <div className="standings-header">
                        {labels.map((label, index) => (
                            <div key={index} className="header-item">
                                {label}
                            </div>
                        ))}
                    </div>
                    {data.map((item, index) => (
                        <div key={index} className={`standings-row ${index === 0 ? "gold" : ""} ${index === 1 ? "silver" : ""} ${index === 2 ? "bronze" : ""}`}>
                            <div className="position">{index + 1}</div>
                            <div className="row-content">
                                {item.map((value, i) => (
                                    <div key={i} className="row-item">
                                        {value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainContainerActual>
    );
}

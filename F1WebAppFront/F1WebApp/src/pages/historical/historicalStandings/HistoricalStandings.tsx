import { useState, useEffect } from "react";
import { useStandings } from "../../../hooks/useStandings";
import "./HistoricalStandings.css";
import { yearsList } from "../../../common/common";
import { MainContainerHistorical } from "../../../common/historicalContainerLayout/MainContainerHistorical";


export const HistoricalStandings: React.FC = () => {
    const { driversStandings, constructorsStandings, getDriverStandingsInAYear, getConstructorStandingsInAYear } = useStandings();

    const [yearSelected, setYearSelected] = useState<number>(1950);
    const [championship, setChampionship] = useState<string>("drivers");

    const yearOptions = yearsList;

    useEffect(() => {
        if (championship === "drivers") {
            getDriverStandingsInAYear(yearSelected.toString());
        } else {
            getConstructorStandingsInAYear(yearSelected.toString());
        }
    }, [yearSelected, championship]);

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
        <MainContainerHistorical>
                <h1 className="calendar-title">Standings</h1>
                <div className="filter-container">
                    <div className="filter">
                        <label className="filter-label">SEASON</label>
                        
                        <select
                            className="year-dropdown"
                            value={yearSelected}
                            onChange={(e) => setYearSelected(Number(e.target.value))}
                        >
                            {yearOptions.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
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
                        <div
                            key={index}
                            className={`standings-row ${index === 0 ? "gold" : ""} ${index === 1 ? "silver" : ""} ${index === 2 ? "bronze" : ""}`}
                        >
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
        </MainContainerHistorical>
    );
}

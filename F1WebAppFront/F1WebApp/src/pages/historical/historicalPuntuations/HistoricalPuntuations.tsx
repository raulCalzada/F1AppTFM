import React, { useEffect, useState } from "react";
import { usePuntuations } from "../../../hooks/usePuntuations";
import { yearsList } from "../../../common/common";
import "./HistoricalPuntuations.css";
import { MainContainerHistorical } from "../../../common/historicalContainerLayout/MainContainerHistorical";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, LineController, BarController, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
import { getColor } from "../../../common/colors";

export const HistoricalPuntuations: React.FC = () => {
    Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, BarController, Legend);
    const [yearSelected, setYearSelected] = useState<number>(2023);
    const { labels, driverDatasets, constructorDatasets, puntuationProgress, progressStatus } = usePuntuations();
    const [championship, setChampionship] = useState<string>("drivers");

    useEffect(() => {
        puntuationProgress(yearSelected.toString());
        console.log(labels);
        console.log(driverDatasets);
        console.log(constructorDatasets);
    }, [yearSelected]);

    const dataDrivers = {
        labels: labels,
        datasets: Object.keys(driverDatasets).map((driverName) => ({
            label: driverName,
            data: driverDatasets[driverName],
            borderColor: getColor(driverName),
            fill: false,
        })),
    };

    const dataConstructors = {
        labels: labels,
        datasets: Object.keys(constructorDatasets).map((constructorName) => ({
            label: constructorName,
            data: constructorDatasets[constructorName],
            borderColor: getColor(constructorName),
            fill: false,
        })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: 'white',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'center' as const, 
                labels: {
                    color: 'white',
                    boxWidth: 10,
                    boxHeight: 10,
                },
            },
        },
    };

    return (
        <MainContainerHistorical>
            <div className="filter-container">
                <div className="filter">
                    <label className="filter-label">YEAR</label>
                    <select className="year-dropdown" value={yearSelected} onChange={(e) => setYearSelected(Number(e.target.value))}>
                        {yearsList.map((year) => (
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

            <div>
                <h1>Puntuations</h1>
            </div>

            {progressStatus.loading ? (
                <div>Loading...</div>
            ) : progressStatus.success ? (
                championship === "drivers" ? (
                    <div className="chart">
                        <Line data={dataDrivers} options={options} />
                    </div>
                ) : (
                    <div className="chart">
                        <Line data={dataConstructors} options={options} />
                    </div>
                )
            ) : (
                <div>No data available.</div>
            )}
        </MainContainerHistorical>
    );
};

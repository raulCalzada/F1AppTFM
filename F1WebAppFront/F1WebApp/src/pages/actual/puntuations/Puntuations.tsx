import React, { useEffect, useState } from "react";
import { MainContainerActual } from "../../../common/actualMainContainer/MainContainerActual";
import { usePuntuations } from "../../../hooks/usePuntuations";
import backgroundImage from "../../../assets/actualRace.png";
import "./Puntuations.css";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, LineController, BarController, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
import { getColor } from "../../../common/colors";

export const Puntuations: React.FC = () => {
    Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, BarController, Legend);
    const [yearSelected] = useState<number>(new Date().getFullYear());
    const { labels, driverDatasets, constructorDatasets, puntuationProgress, progressStatus } = usePuntuations();
    const [championship, setChampionship] = useState<string>("drivers");


    useEffect(() => {
        puntuationProgress(yearSelected.toString());
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
        maintainAspectRatio: true,
        aspectRatio: 3,
        radius: 1,
        borderWidth: 2,
        scales: {
            x: {
                ticks: {
                    color: 'white'
                }
            },
            y: {
                ticks: {
                    color: 'white'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                align: 'center',
                labels: {
                    color: 'white',
                    boxWidth: 10,
                    boxHeight: 10
                }
            }
        }
    };


    return (
        <MainContainerActual>
            <div className="puntuations-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h1 className="title">Puntuations</h1>
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
            </div>
        </MainContainerActual>
    );
};

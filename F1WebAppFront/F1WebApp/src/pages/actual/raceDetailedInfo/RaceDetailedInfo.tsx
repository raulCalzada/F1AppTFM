import { MainContainerActual } from "../../../common/actualMainContainer/MainContainerActual";
import backgroundImage from "../../../assets/actualRace.png";
import { useRace } from "../../../hooks/useRace";
import { useEffect, useState } from "react";
import { useWeather } from "../../../hooks/useWheather";
import { currentDate } from "../../../common/common";
import "./RaceDetailedInfo.css";
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, LineController, BarController, Legend } from 'chart.js';
import { getWeatherIcon } from "../../../common/wheatherIconMapper";

export const RaceDetailedInfo: React.FC = () => {
    Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, BarController, Legend);
    const { race, getNextOrLastRace, getRaceList, raceList, raceStatus, singleRaceStatus } = useRace();
    const { weather, fetchWeather, weatherStatus } = useWeather();
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [iconPaths, setIconPaths] = useState<string[]>([]);


    useEffect(() => {
        const fetchRaceList = async () => {
            await getRaceList(currentDate.getFullYear().toString());
        };

        fetchRaceList();
    }, []);

    useEffect(() => {
        const fetchNextRace = async () => {
            if (raceStatus.success) {
                await getNextOrLastRace(raceList);
            }
        };

        fetchNextRace();
    }, [raceStatus]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (singleRaceStatus.success && race) {
                await fetchWeather(
                    parseFloat(race.Circuit.Location.lat),
                    parseFloat(race.Circuit.Location.long),
                    race.date
                );
            }
        };

        fetchWeatherData();
    }, [singleRaceStatus]);

    useEffect(() => {
        if (race?.date) {
            const raceDate = new Date(race.date);
            const interval = setInterval(() => {
                const now = new Date();
                const diff = raceDate.getTime() - now.getTime();

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [singleRaceStatus]);

    useEffect(() => {
        const loadIcons = async () => {
            const icons = await Promise.all(weatherCodeData.map(async (code) => {
                const iconName = getWeatherIcon(code);
                try {
                    const icon = await import(`../../../assets/weather_icons/${iconName}`);
                    return icon.default;
                } catch (error) {
                    console.error("Error loading icon:", error);
                    return ''; 
                }
            }));
            setIconPaths(icons);
        };

        if (weatherCodeData.length > 0) {
            loadIcons();
        }
    }, [weatherStatus]);

    const temperatureData = weather?.hourly.temperature_2m ?? [];
    const windSpeedData = weather?.hourly.wind_speed_10m ?? [];
    const cloudCoverData = weather?.hourly.cloudcover ?? [];
    const weatherCodeData = weather?.hourly.weathercode ?? [];
    const timeData = weather?.hourly.time ?? [];

    // Map weather codes to icons
    const weatherIcons = weatherCodeData.map(code => getWeatherIcon(code));

    // ChartData
    const data = {
        labels: timeData,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temperatureData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Wind Speed (m/s)',
                data: windSpeedData,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
                label: 'Cloud Cover (%)',
                data: cloudCoverData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
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
                position: 'top' as const,
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
            {(!weatherStatus.success) ? (
                <p>Loading data...</p>
            ) : (
                <div className="drivers-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <h1>{race?.raceName}</h1>
                    <h2>Round Number {race?.round}</h2>
                    <div className="countdown">
                        <h3>Time left until race:</h3>
                        <p>{timeLeft}</p>
                    </div>

                    <div className="grid-container">
                        <div className="grid-item circuit-info">
                            <h3>Circuit Information</h3>
                            <p><strong>Circuit Name:</strong> {race?.Circuit.circuitName}</p>
                            <p><strong>Location:</strong> {race?.Circuit.Location.locality}, {race?.Circuit.Location.country}</p>
                            <p><strong>Race Date:</strong> {race?.date}</p>
                            <p><a href={race?.url} target="" rel="">More Information</a></p>
                        </div>

                        <div className="grid-item weather-summary">
                            <h3>Weather Summary</h3>
                            <p>Expected Conditions:</p>
                            <p>Temperature range: {Math.min(...temperatureData)}°C to {Math.max(...temperatureData)}°C</p>
                            <p>Wind speed range: {Math.min(...windSpeedData)} m/s to {Math.max(...windSpeedData)} m/s</p>
                            <p>Cloud cover range: {Math.min(...cloudCoverData)}% to {Math.max(...cloudCoverData)}%</p>
                        </div>

                        <div className="weather-chart">
                        <h3>Weather Through The Day</h3>
                        <Line data={data} options={options} />
                    </div>
                    </div>

                    <h3>Hourly weather</h3>
                    <div className="hourly-weather-conatiner">
                        <div className="hourly-weather-grid">
                            {timeData.map((time, index) => (
                                <div key={index} className="hourly-weather-item">
                                    <p>{new Date(time).getHours()}:00</p> {/* Muestra la hora */}
                                    <img
                                        src={`/src/assets/weathers/${weatherIcons[index]}`}
                                        alt={`{weatherIcons[index]}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid-item circuit-map">
                        <h3>Location Map</h3>
                        <iframe
                            src={`https://www.google.com/maps?q=${race?.Circuit.Location.lat},${race?.Circuit.Location.long}&z=15&output=embed`}
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            )}
        </MainContainerActual>
    );
};

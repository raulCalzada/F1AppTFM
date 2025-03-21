import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import actualImage from "../../assets/backgroundActual.png";
import historicalImage from "../../assets/startingGrid.png";
import historicalLogo from "../../assets/f1logo.png";
import currentLogo from "../../assets/f1newLogo.png";

export const Home: React.FC = () => {
    return (
        <>
            <div className="title-container">
                <img className="title-logo" src={currentLogo} alt="Current F1 Logo" />
                <h1 className="main-title">F1 Web App</h1>
                <img className="title-logo" src={historicalLogo} alt="Historical F1 Logo" />
            </div>
            <div className="home-container">
                <Link to="/actual" className="current-section-link">
                    <div className="current-section">
                        <img src={actualImage} alt="Current F1" className="background-image" />
                        <div className="current-overlay">
                            <h1 className="current-title">Current F1</h1>
                        </div>
                    </div>
                </Link>
                <div className="historical-section">
                    <img src={historicalImage} alt="Historical F1" className="background-image" />
                    <div className="historical-content">
                        <h2 className="historical-title">Explore Historical F1</h2>
                        <div className="historical-links">
                            <Link to="/historical/drivers" className="historical-card">
                                Historical Drivers
                            </Link>
                            <Link to="/historical/teams" className="historical-card">
                                Historical Teams
                            </Link>
                            <Link to="/historical/calendar" className="historical-card">
                                Historical Calendar
                            </Link>
                            <Link to="/historical/puntuations" className="historical-card">
                                Historical Puntuations
                            </Link>
                            <Link to="/historical/standings" className="historical-card">
                                Historical Standings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

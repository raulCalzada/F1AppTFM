import React from "react";
import { Link } from "react-router-dom";
import { MainContainerActual } from "../../../common/actualMainContainer/MainContainerActual";
import "./ActualMenu.css";

export const ActualMenu: React.FC = () => {
    return (
        <MainContainerActual>
            <div className="actual-menu">
                <div className="main-card">
                    <h1 className="main-title">This Week's Race</h1>
                    <div className="main-card-content">
                        <p>Get ready for the excitement of this week's race! Stay tuned for all the details and live updates.</p>
                        <Link to="/actual/nextRace" className="main-card-link">View Next Race Info</Link>
                    </div>
                </div>
                <div className="sub-cards">
                    <Link to="/actual/teams" className="sub-card">
                        <h2 className="sub-card-title">Teams</h2>
                        <p className="sub-card-description">Explore the teams competing this season.</p>
                    </Link>
                    <Link to="/actual/drivers" className="sub-card">
                        <h2 className="sub-card-title">Drivers</h2>
                        <p className="sub-card-description">Meet the drivers on the grid this year.</p>
                    </Link>
                    <Link to="/actual/calendar" className="sub-card">
                        <h2 className="sub-card-title">Calendar</h2>
                        <p className="sub-card-description">Check out the full race calendar.</p>
                    </Link>
                    <Link to="/actual/standings" className="sub-card">
                        <h2 className="sub-card-title">Standings</h2>
                        <p className="sub-card-description">Track the latest standings and points.</p>
                    </Link>
                    <Link to="/actual/puntuations" className="sub-card">
                        <h2 className="sub-card-title">Season Progress</h2>
                        <p className="sub-card-description">Shows the progress during the season.</p>
                    </Link>

                </div>
            </div>
        </MainContainerActual>
    );
};

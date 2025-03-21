import React, { useEffect, useState } from "react";
import { useConstructor } from "../../../hooks/useConstructor";
import { MainContainerActual } from "../../../common/actualMainContainer/MainContainerActual";
import "./Teams.css";
import backgroundImage from "../../../assets/actualRace.png";
import { Constructor } from "../../../types/constructor";
import { demonymsToCountryImageUrl } from "../../../common/countriesMapper";
import { useGpt } from "../../../hooks/useGpt"; // Asumo que hay un hook para GPT

export const Teams: React.FC = () => {
    const { constructors, getAllConstructorsInAYear } = useConstructor();
    const [selectedTeam, setSelectedTeam] = useState<Constructor | null>(null);
    const [nationalityImageUrl, setNationalityImageUrl] = useState<string | null>(null);
    const { description, getDescription, descriptionStatus } = useGpt(); // Hook para obtener descripción

    // Fetch all constructors in the current year
    useEffect(() => {
        getAllConstructorsInAYear(new Date().getFullYear().toString());
    }, []);

    // Handle the click on a team card
    const handleCardClick = (team: Constructor) => {
        setSelectedTeam(team);
    };

    //Sets de flag for the selected team and gets the description
    useEffect(() => {
        if (selectedTeam) {
            getDescription(selectedTeam.name);
            demonymsToCountryImageUrl(selectedTeam.nationality)
                .then((image) => setNationalityImageUrl(image))
                .catch((error) => {
                    console.error('Error fetching nationality image:', error);
                    setNationalityImageUrl(null);
                });
        }
    }, [selectedTeam]);

    // When close, everything gets back to zero
    const closeModal = () => {
        setSelectedTeam(null);
        setNationalityImageUrl(null);
    };

    return (
        <MainContainerActual>
            <div className="teams-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h1 className="title">Teams</h1>
                <div className="teams-list">
                    {constructors.map((team) => (
                        <div className="team-card" key={team.constructorId} onClick={() => handleCardClick(team)}>
                            <h2 className="team-name">{team.name}</h2>
                            <p className="team-nationality">{team.nationality}</p>
                        </div>
                    ))}
                </div>

                {selectedTeam && (
                    <div className="modal" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span className="close-button" onClick={closeModal}>&times;</span>
                            <h2>{selectedTeam.name}</h2>
                            <img
                                src={`/src/assets/teams/${selectedTeam.constructorId}.png`}
                                alt={`${selectedTeam.name} logo`}
                                className="team-logo"
                                onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                            <p>{selectedTeam.nationality}</p>
                            {nationalityImageUrl && (
                                <img
                                    src={nationalityImageUrl}
                                    alt={`${selectedTeam.nationality} flag`}
                                    className="team-logo"
                                    onError={(e) => e.currentTarget.style.display = 'none'}
                                />
                            )}
                            <div></div>
                            <p className="team-description">
                                {descriptionStatus.loading && "Loading..."}
                                {descriptionStatus.error && selectedTeam.url && (
                                    <a href={selectedTeam.url} target="_blank" rel="noopener noreferrer">
                                        More information
                                    </a>
                                )}
                                {descriptionStatus.success && description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </MainContainerActual>
    );
};

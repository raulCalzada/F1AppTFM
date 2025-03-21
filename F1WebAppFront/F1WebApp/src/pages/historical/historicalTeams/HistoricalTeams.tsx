import React, { useEffect, useState } from 'react';
import { useConstructor } from '../../../hooks/useConstructor';
import './HistoricalTeams.css';
import { Constructor } from '../../../types/constructor';
import { MainContainerHistorical } from '../../../common/historicalContainerLayout/MainContainerHistorical';
import { yearsList } from '../../../common/common';
import { demonymsToCountryImageUrl } from '../../../common/countriesMapper';

export const HistoricalTeams: React.FC = () => {
    const { constructors, getAllConstructorsInAYear } = useConstructor();
    const [selectedConstructor, setSelectedConstructor] = useState<Constructor | null>(null);
    const [yearSelected, setYearSelected] = useState<number>(2023);
    const [nationalityImageUrl, setNationalityImageUrl] = useState<string | null>(null);

    useEffect(() => {
        getAllConstructorsInAYear(yearSelected.toString());
    }, [yearSelected]);

    useEffect(() => {
        if (selectedConstructor) {
            demonymsToCountryImageUrl(selectedConstructor.nationality)
                .then((imageUrl) => setNationalityImageUrl(imageUrl))
                .catch((error) => {
                    console.error('Error fetching nationality image:', error);
                    setNationalityImageUrl(null);
                });
        }
    }, [selectedConstructor]);

    const handleCardClick = (constructor: Constructor) => {
        setSelectedConstructor(constructor);
    };

    const closeModal = () => {
        setSelectedConstructor(null);
        setNationalityImageUrl(null); // Reset nationality image URL when closing the modal
    };

    return (
        <MainContainerHistorical>
            <h1 className="teams-title">Teams</h1>

            <select className="year-dropdown" value={yearSelected} onChange={(e) => setYearSelected(Number(e.target.value))}>
                {yearsList.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            <div className="teams-list">
                {constructors.map((team) => (
                    <div className="team-card" key={team.constructorId} onClick={() => handleCardClick(team)}>
                        <h2 className="team-name">{team.name}</h2>
                        <p className="team-nationality">{team.nationality}</p>
                    </div>
                ))}
            </div>

            {selectedConstructor && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2>{selectedConstructor.name}</h2>
                        {nationalityImageUrl && (
                            <img
                                src={nationalityImageUrl}
                                alt={`${selectedConstructor.nationality} flag`}
                                className="country-flag"
                            />
                        )}
                        <p>Nationality: {selectedConstructor.nationality}</p>
                        <div>
                            <a href={selectedConstructor.url} target="_blank" rel="noopener noreferrer" className="more-info-link">
                                More info about the team
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </MainContainerHistorical>
    );
};

import React, { useEffect, useState } from "react";
import { useDrivers } from "../../../hooks/useDrivers";
import "./HistoricalDrivers.css";
import { Driver } from "../../../types/driver";
import { MainContainerHistorical } from "../../../common/historicalContainerLayout/MainContainerHistorical";
import { yearsList } from "../../../common/common";
import { demonymsToCountryImageUrl } from "../../../common/countriesMapper";

export const HistoricalDrivers: React.FC = () => {
    const { drivers, getAllDriversInAYear } = useDrivers();
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [yearSelected, setYearSelected] = useState<number>(2023);
    const [nationalityImageUrl, setNationalityImageUrl] = useState<string | null>(null);

    useEffect(() => {
        getAllDriversInAYear(yearSelected.toString());
    }, []);

    useEffect(() => {
        getAllDriversInAYear(yearSelected.toString());
    }, [yearSelected]);

    useEffect(() => {
        if (selectedDriver) {
            demonymsToCountryImageUrl(selectedDriver.nationality)
                .then((imageUrl) => setNationalityImageUrl(imageUrl))
                .catch((error) => {
                    console.error('Error fetching nationality image:', error);
                    setNationalityImageUrl(null);
                });
        }
    }, [selectedDriver]);

    const handleCardClick = (driver: Driver) => {
        setSelectedDriver(driver);
    };

    const closeModal = () => {
        setSelectedDriver(null);
        setNationalityImageUrl(null); // Reset nationality image URL when closing the modal
    };

    return (
        <MainContainerHistorical>
            <h1 className="drivers-title">Drivers</h1>

            <select className="year-dropdown" value={yearSelected} onChange={(e) => setYearSelected(Number(e.target.value))}>
                {yearsList.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            <div className="drivers-list">
                {drivers.map((driver) => (
                    <div className="driver-card" key={driver.driverId} onClick={() => handleCardClick(driver)}>
                        <h2 className="driver-name">{`${driver.givenName} ${driver.familyName}`}</h2>
                        <h3 className="driver-number">{driver.permanentNumber}</h3>
                    </div>
                ))}
            </div>

            {selectedDriver && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2>{`${selectedDriver.givenName} ${selectedDriver.familyName}`}</h2>
                        <p>Date of Birth: {selectedDriver.dateOfBirth}</p>
                        {nationalityImageUrl && (
                            <img
                                src={nationalityImageUrl}
                                alt={`${selectedDriver.nationality} flag`}
                                className="country-flag"
                            />
                        )}
                        <p>Nationality: {selectedDriver.nationality}</p>
                        <div>
                            <a href={selectedDriver.url} target="_blank" rel="noopener noreferrer" className="more-info-link">
                                More info about him
                            </a>
                        </div>


                    </div>
                </div>
            )}
        </MainContainerHistorical>
    );
};

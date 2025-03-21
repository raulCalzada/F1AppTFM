import React, { useEffect, useState } from "react";
import { useDrivers } from "../../../hooks/useDrivers";
import { MainContainerActual } from "../../../common/actualMainContainer/MainContainerActual";
import "./Drivers.css";
import backgroundImage from "../../../assets/prueba2.png";
import { Driver } from "../../../types/driver";
import { demonymsToCountryImageUrl } from "../../../common/countriesMapper";
import { useGpt } from "../../../hooks/useGpt";

export const Drivers: React.FC = () => {
    const { drivers, getAllDriversInAYear } = useDrivers();
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [nationalityImageUrl, setNationalityImageUrl] = useState<string | null>(null);
    const { description, getDescription, descriptionStatus } = useGpt();

    useEffect(() => {
        getAllDriversInAYear(new Date().getFullYear().toString());
    }, []);

    const handleCardClick = (driver: Driver) => {
        setSelectedDriver(driver);
    };

    useEffect(() => {
        if (selectedDriver) {
            getDescription(selectedDriver.givenName + " " + selectedDriver.familyName);
            demonymsToCountryImageUrl(selectedDriver.nationality)
                .then((image) => setNationalityImageUrl(image))
                .catch((error) => {
                    console.error("Error fetching nationality image:", error);
                    setNationalityImageUrl(null);
                });
        }
    }, [selectedDriver]);

    const closeModal = () => {
        setSelectedDriver(null);
        setNationalityImageUrl(null);
    };

    return (
        <MainContainerActual>
            <div className="drivers-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <h1 className="title">Drivers</h1>
                <div className="drivers-list">
                    {drivers.map((driver) => (
                        <div className="driver-card" key={driver.driverId} onClick={() => handleCardClick(driver)}>
                            <h2 className="driver-name">{`${driver.givenName} ${driver.familyName}`}</h2>
                            <h3 className="driver-number">{driver.permanentNumber}</h3>
                            <p className="driver-nationality">{driver.code}</p>
                        </div>
                    ))}
                </div>

                {selectedDriver && (
                    <div className="modal" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span className="close-button" onClick={closeModal}>
                                &times;
                            </span>
                            <h2>{`${selectedDriver.givenName} ${selectedDriver.familyName}`}</h2>
                            <img
                                src={`/src/assets/drivers/${selectedDriver.driverId}.png`}
                                alt={`${selectedDriver.code} logo`}
                                className="team-logo"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                            <p>Date of Birth: {selectedDriver.dateOfBirth}</p>
                            <p>Nationality: {selectedDriver.nationality}</p>
                            {nationalityImageUrl && (
                                <img
                                    src={nationalityImageUrl}
                                    alt={`${selectedDriver.nationality} flag`}
                                    className="country-flag"
                                />
                            )}
                            <div></div>
                            <p className="driver-description">
                                {descriptionStatus.loading && "Loading..."}
                                {descriptionStatus.error && selectedDriver.url && (
                                    <a href={selectedDriver.url} target="_blank" rel="noopener noreferrer">
                                        More infromation
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

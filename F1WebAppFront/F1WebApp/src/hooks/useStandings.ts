import { useCallback, useState } from "react";
import { DriverStanding } from "../types/driverStanding";
import { ConstructorStandings } from "../types/constructorStandings";
import { useStatus } from "./useStatus";
import { obtainDriverStandings, obtainConstructorStandings } from "../api/standings";

export const useStandings = () => {
    const [driversStandings, setDriversStandings] = useState<DriverStanding[]>([]);
    const [constructorsStandings, setConstructorsStandings] = useState<ConstructorStandings[]>([]);

    const { status: driverStatus, onSuccess: onDriverSuccess, onError: onDriverError, onLoading: onDriverLoading } = useStatus();
    const { status: constructorStatus, onSuccess: onConstructorSuccess, onError: onConstructorError, onLoading: onConstructorLoading } = useStatus();

    const getDriverStandingsInAYear = useCallback((year: string) => {
        onDriverLoading();
        obtainDriverStandings(year)
            .then((response) => {
                if (response && response.MRData.StandingsTable.StandingsLists.length > 0) {
                    const standingsList = response.MRData.StandingsTable.StandingsLists[0];
                    setDriversStandings(standingsList.DriverStandings);
                    onDriverSuccess(`Driver standings for ${standingsList.season} fetched successfully`);
                } else {
                    onDriverError("No driver standings found for the given year");
                }
            })
            .catch((error) => {
                onDriverError(error.message);
            });
    }, [onDriverSuccess, onDriverError, onDriverLoading]);

    const getConstructorStandingsInAYear = useCallback((year: string) => {
        onConstructorLoading();
        obtainConstructorStandings(year)
            .then((response) => {
                if (response && response.MRData.StandingsTable.StandingsLists.length > 0) {
                    const standingsList = response.MRData.StandingsTable.StandingsLists[0];
                    setConstructorsStandings(standingsList.ConstructorStandings);
                    onConstructorSuccess(`Constructor standings for ${standingsList.season} fetched successfully`);
                } else {
                    onConstructorError("No constructor standings found for the given year");
                }
            })
            .catch((error) => {
                onConstructorError(error.message);
            });
    }, [onConstructorSuccess, onConstructorError, onConstructorLoading]);

    return {
        driversStandings,
        constructorsStandings,
        getDriverStandingsInAYear,
        getConstructorStandingsInAYear,
        driverStatus,
        constructorStatus,
    };
};

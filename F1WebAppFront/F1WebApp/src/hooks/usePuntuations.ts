import { obtainAllConstructorsInAYear } from "../api/constructor";
import { obtainAllDriversInAYear } from "../api/driver";
import {
    obtainRaceResults,
    obtainRounds,
    obtainSprintRaceResults,
} from "../api/race";
import { Driver } from "../types/driver";
import { Constructor } from "../types/constructor";
import { useCallback, useState } from "react";
import { useStatus } from "./useStatus";

export const usePuntuations = () => {
    const [driverDatasets, setDriverDatasets] = useState<{ [key: string]: number[] }>({});
    const [constructorDatasets, setConstructorDatasets] = useState<{ [key: string]: number[] }>({});
    const [labels, setLabels] = useState<string[]>([]);
    const { status: progressStatus, onSuccess, onError, onLoading } = useStatus();

    const puntuationProgress = useCallback(async (year: string) => {
        onLoading();     
        setLabels([]);
        setDriverDatasets({});
        setConstructorDatasets({});
        const rounds = await obtainRounds(year)
            .then((response) => parseInt(response.MRData.total))
            .catch((error) => {
                console.log(error);
                onError();
                return 0;
            });

        const drivers: Driver[] = await obtainAllDriversInAYear(year)
            .then((response) => response.MRData.DriverTable.Drivers)
            .catch((error) => {
                onError();
                console.log(error);
                return [];
            });

        const constructors: Constructor[] = await obtainAllConstructorsInAYear(year)
            .then((response) => response.MRData.ConstructorTable.Constructors)
            .catch((error) => {
                console.log(error);
                return [];
            });

        const newDriverDatasets = {};
        drivers.forEach((driver) => {
            newDriverDatasets[driver.familyName] = [];
        });

        const newConstructorDatasets = {};
        constructors.forEach((constructor) => {
            newConstructorDatasets[constructor.name] = [];
        });

        let newLabels = [];
        for (let i = 1; i <= rounds; i++) {
            const race = await obtainRaceResults(year, i.toString())
                .then((response) => response.MRData.RaceTable.Races[0])
                .catch((error) => {
                    console.log(error);
                    return null;
                });

            const sprint = await obtainSprintRaceResults(year, i.toString())
                .then((response) => response.MRData.RaceTable.Races[0])
                .catch((error) => {
                    console.log(error);
                    return null;
                });

                if (!race) {
                    drivers.forEach((driver) => {
                        const lastPoints = i === 1 ? 0 : newDriverDatasets[driver.familyName][i - 2] || 0;
                        newDriverDatasets[driver.familyName].push(lastPoints);
                    });
            
                    constructors.forEach((constructor) => {
                        const lastPoints = i === 1 ? 0 : newConstructorDatasets[constructor.name][i - 2] || 0;
                        newConstructorDatasets[constructor.name].push(lastPoints);
                    });
            
                    continue;
                }

            newLabels.push(race.raceName.replace("Grand Prix", "").trim());

            drivers.forEach((driver) => {
                const racePoints = race.Results.find((r) => r.Driver.familyName === driver.familyName)?.points || 0;
                const sprintRacePoints = sprint?.SprintResults?.find((r) => r.Driver.familyName === driver.familyName)?.points || 0;
                const lastPoints = i === 1 ? 0 : newDriverDatasets[driver.familyName][i - 2] || 0;
                const totalPoints = parseFloat(racePoints) + parseFloat(sprintRacePoints) + lastPoints;
                newDriverDatasets[driver.familyName].push(totalPoints);
            });

            constructors.forEach((constructor) => {
                const raceDrivers = race.Results.filter((r) => r.Constructor.name === constructor.name);
                const racePoints = parseFloat(raceDrivers[0]?.points || 0) + parseFloat(raceDrivers[1]?.points || 0);
                const sprintDrivers = sprint?.SprintResults?.filter((r) => r.Constructor.name === constructor.name);
                const lastPoints = i === 1 ? 0 : newConstructorDatasets[constructor.name][i - 2] || 0;
                const totalPoints = racePoints + (sprintDrivers ? (parseFloat(sprintDrivers[0]?.points || 0) + parseFloat(sprintDrivers[1]?.points || 0)) : 0) + lastPoints;
                newConstructorDatasets[constructor.name].push(totalPoints);
            });
        }
        setLabels(newLabels);
        setDriverDatasets(newDriverDatasets);
        setConstructorDatasets(newConstructorDatasets);
        onSuccess();
    }, [onSuccess, onError, onLoading]);

    return {
        driverDatasets,
        constructorDatasets,
        setLabels,
        labels,
        puntuationProgress,
        progressStatus,
        setDriverDatasets,
        setConstructorDatasets,
    };
};

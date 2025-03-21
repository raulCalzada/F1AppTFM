import { useCallback, useState } from "react";
import { useStatus, useStatus2 } from "./useStatus";
import { obtainRaceCalendar, obtainRaceResults } from "../api/race";
import { Race } from "../types/race";
import { currentDate } from "../common/common";



export const useRace = () => {
    const [raceList, setRaceList] = useState<Race[]>([]);
    const [numberOfRaces, setNumberOfRaces] = useState<number>(0);
    const [race, setRace] = useState<Race>();

    const { status: raceStatus, onSuccess, onError, onLoading } = useStatus();
    const { status: singleRaceStatus, onSuccess2, onError2, onLoading2 } = useStatus2();


    const getRaceList = useCallback(async (year: string) => {
        onLoading();
        obtainRaceCalendar(year)
            .then((response) => {
                setRaceList(response.MRData.RaceTable.Races);
                setNumberOfRaces(response.MRData.total);
                onSuccess(response
                    ? `Race calendar in ${response.MRData.RaceTable.season} fetched successfully`
                    : '');
            })
            .catch((error) => {
                onError(error.message);
            })
    }, [onSuccess, onError, onLoading]);

    const getRace = useCallback(async (year: string, round: string) => {
        onLoading();
        obtainRaceResults(year, round)
            .then((response) => {
                setRace(response.MRData.RaceTable.Races[0]);
                console.log(response.MRData.RaceTable.Races[0]);
                onSuccess(response
                    ? `Race ${response.MRData.RaceTable.round} fetched successfully`
                    : '');
            })
            .catch((error) => {
                onError(error.message);
            })
    }, [onSuccess, onError, onLoading]);


    const getNextOrLastRace = useCallback(async (races: Race[]) => {
        onLoading2();
        const exactMatchRace = races.find(race => new Date(race.date).toDateString() === currentDate.toDateString());
        console.log("exact " + exactMatchRace);
        if (exactMatchRace) {
            console.log("hola");
            setRace(exactMatchRace);
            onSuccess2(`Exact match race found: ${exactMatchRace.raceName} on ${exactMatchRace.date}`);
        } else {
            const upcomingRace = races.find(race => new Date(race.date) > currentDate);
            console.log("up " + exactMatchRace);
            if (upcomingRace) {
                setRace(upcomingRace);
                onSuccess2(`No exact match found. Next race: ${upcomingRace.raceName} on ${upcomingRace.date}`);
            } else {
                const previousRace = races.slice().reverse().find(race => new Date(race.date) < currentDate);
                console.log("prev" + exactMatchRace);
                if (previousRace) {
                    setRace(previousRace);
                    onSuccess2(`No exact match or upcoming race found. Previous race: ${previousRace.raceName} on ${previousRace.date}`);
                } else {
                    onError2('No previous race found');
                }
            }
        }
    }, [onSuccess2, onError2, onLoading2]);

    return {
        raceList,
        numberOfRaces,
        race,
        getRace,
        getRaceList,
        getNextOrLastRace,
        raceStatus,
        singleRaceStatus
    };
};



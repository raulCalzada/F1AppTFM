import axios from 'axios';

const BaseUrl = '/api';

export const obtainAllConstructorsInAYear = async (year: string) => {
    const response = await axios.get(`${BaseUrl}/${year}/constructors.json`);
    return response.data;
}

export const obtainConstructorPointsPerRound = async (year: string, round: string, constructorId: string) => {
    const response = await axios.get(`${BaseUrl}/${year}/${round}/constructors/${constructorId}/constructorStandings.json`);
    return response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].points;

}

export const obtainConstructorsInAYear = async (year: string) => {
    const response = await axios.get(`${BaseUrl}/${year}/constructors.json`);
    return response.data.MRData.ConstructorTable.Constructors;
}
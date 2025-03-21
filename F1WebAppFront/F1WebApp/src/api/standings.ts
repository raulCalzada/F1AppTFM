import axios from "axios";

const BaseUrl = '/api';

export const obtainConstructorStandings = async (year: string) => {
    const response = await axios.get(`${BaseUrl}/${year}/constructorStandings.json`);
    return response.data;
};

export const obtainDriverStandings = async (year: string) => {
    const response = await axios.get(`${BaseUrl}/${year}/driverStandings.json`);
    return response.data;
};
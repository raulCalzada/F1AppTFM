import axios from "axios";


const BaseUrl = '/api';
const oldErgastBaseUrl = '/ergast-api';


export const obtainRaceCalendar = async (year: string) => {
    const response = await axios.get(`${BaseUrl}/${year}.json`);
    return response.data;
};

export const obtainCalendar = async (year: string) => {
    const response = await axios.get(`${BaseUrl}/${year}.json`);
    return response.data.MRData.total;
};

const retryWithExponentialBackoff = async (fn, retries = 3, delay = 200) => {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0 || (error.response && error.response.status !== 429)) {
            throw error; 
        }

        await new Promise((resolve) => setTimeout(resolve, delay));

        return retryWithExponentialBackoff(fn, retries - 1, delay * 2);
    }
};

export const obtainRaceResults = async (year: string, round: string) => {
    const makeRequest = () => axios.get(`${BaseUrl}/${year}/${round}/results.json`);
    try {
        const response = await retryWithExponentialBackoff(makeRequest);
        return response.data;
    } catch (error) {
        console.log("Final attempt failed or not a 429 error:", error);
    }
};

export const obtainRounds = async (year: string) => {
    const makeRequest = () => axios.get(`${BaseUrl}/${year}.json`);
    try {
        const response = await retryWithExponentialBackoff(makeRequest);
        return response.data;
    } catch (error) {
        console.log("Final attempt failed or not a 429 error:", error);
    }
};

export const obtainSprintRaceResults = async (year: string, round: string) => {
    if (parseInt(year) < 2021) {
        return null;
    }
    const makeRequest = () => axios.get(`${BaseUrl}/${year}/${round}/sprint.json`);
    try {
        const response = await retryWithExponentialBackoff(makeRequest);
        return response.data;
    } catch (error) {
        console.log(error);

    }
};



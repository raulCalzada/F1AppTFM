import axios from 'axios';

const BaseUrl = '/api';

export const obtainAllDriversInAYear = async (year: string) => {
        const response = await axios.get(`${BaseUrl}/${year}/drivers.json`);
        return response.data;
}


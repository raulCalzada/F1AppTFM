import axios from 'axios';
import { ForecastResponse } from '../types/weather';

const BaseUrl = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherForecast = async (latitude: number, longitude: number, date: string): Promise<ForecastResponse> => {
    const url = `${BaseUrl}?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&hourly=temperature_2m,wind_speed_10m,cloudcover,weathercode`;
    const response = await axios.get<ForecastResponse>(url);
    return response.data;

}




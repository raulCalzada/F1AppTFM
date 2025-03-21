import { useCallback, useState } from 'react';
import { useStatus } from './useStatus';
import { ForecastResponse } from '../types/weather';
import { getWeatherForecast } from '../api/weather';
import { getWeatherIcon } from '../common/wheatherIconMapper';

export const useWeather = () => {
    const [weather, setWeather] = useState<ForecastResponse | null>(null);
    const { status: weatherStatus, onSuccess, onError, onLoading } = useStatus();

    const fetchWeather = useCallback(async (latitude: number, longitude: number, date: string) => {
        onLoading();
        try {
            const data = await getWeatherForecast(latitude, longitude, date);
            setWeather(data);
            onSuccess('Weather data fetched successfully');
        } catch (err) {
            onError('Error fetching weather data');
        }
    }, [onSuccess, onError, onLoading]);

    const getWeatherIcons = useCallback((weatherCodes: number[]): string[] => {
        return weatherCodes.map(code => getWeatherIcon(code)); 
    }, []);

    return {
        weather,
        fetchWeather,
        weatherStatus,
        getWeatherIcons,  
    };
};

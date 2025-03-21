export interface WeatherData {
    time: string[];
    temperature_2m: number[];
    wind_speed_10m: number[];
    cloudcover: number[];
    weathercode: number[];
}

export interface ForecastResponse {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    hourly: WeatherData;
}

export const weatherIconMap: { [key: string]: string } = {
    '0': 'sunny.png',        
    '1': 'mostly_sunny.png', 
    '2': 'partly_cloudy.png', 
    '3': 'cloudy.png',        
    '4': 'fog.png',          
    '5': 'drizzle.png',       
    '6': 'rain.png',          
    '7': 'snow.png',         
    '8': 'showers.png',       
    '9': 'thunderstorm.png'   
};

export const getWeatherIcon = (code: number): string => {
    const firstDigit = String(code)[0]; 
    return weatherIconMap[firstDigit] || 'unknown.png'; 
};
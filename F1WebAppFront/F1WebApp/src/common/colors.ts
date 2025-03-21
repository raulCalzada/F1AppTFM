const predefinedColors: { [key: string]: string } = {
    "Hamilton": "#00D2BE",       
    "Russell": "#00D2BE",        
    "Verstappen": "#1E41FF",     
    "Pérez": "#1E41FF",          
    "Leclerc": "#DC0000",        
    "Sainz": "#DC0000",         
    "Alonso": "#174502 ",       
    "Stroll": "#174502 ",         
    "Norris": "#FF8700",        
    "Piastri": "#FF8700",        
    "Ocon": "#0090FF",         
    "Gasly": "#0090FF",         
    "Bottas": "#900000",        
    "Zhou": "#900000",           
    "Magnussen": "#FFFFFF",      
    "Hulkenberg": "#FFFFFF",     
    "Albon": "#005AFF",         
    "Sargeant": "#005AFF",       
    "Tsunoda": "#2B4562",        
    "Ricciardo": "#2B4562",      

    // Teams
    "Mercedes": "#00D2BE",       
    "Red Bull": "#1E41FF",      
    "Ferrari": "#DC0000",       
    "Aston Martin": "#174502 ",   
    "McLaren": "#FF8700",       
    "Alpine": "#0090FF",         
    "Alfa Romeo": "#900000",    
    "Haas": "#FFFFFF",           
    "Williams": "#005AFF",       
    "AlphaTauri": "#2B4562",    
    "RB F1 Team": "#1E41FF",     
    
};

export const getColor = (name: string): string => {
    if (predefinedColors[name]) {
        return predefinedColors[name];
    }
    return getRandomColor();
};

const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
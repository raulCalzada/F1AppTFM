import { useCallback, useState } from "react";
import { useStatus } from "./useStatus";
import { Driver } from "../types/driver";
import { obtainAllDriversInAYear } from "../api/driver";



export const useDrivers = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const {status:driverStatus, onSuccess, onError, onLoading } = useStatus();
 

    const getAllDriversInAYear = useCallback(async (year: string) => {
        onLoading();
        obtainAllDriversInAYear(year)
        .then((response) => {
            setDrivers(response.MRData.DriverTable.Drivers);
            onSuccess(response
                ? `Drivers in ${response.MRData.DriverTable.season} fetched successfully`
                : '');
        })
        .catch((error) => {
            onError(error.message);
        });
        console.log(drivers);
    }, [onSuccess, onError, onLoading]);
        

    
    return {
        drivers, 
        getAllDriversInAYear,
        driverStatus,    
    };
}

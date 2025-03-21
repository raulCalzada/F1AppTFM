import { useCallback, useState } from "react";
import { obtainAllConstructorsInAYear } from "../api/constructor";
import { useStatus } from "./useStatus";
import { Constructor } from "../types/constructor";



export const useConstructor = () => {
    const [constructors, setConstructors] = useState<Constructor[]>([]);
    const {status:constructorStatus, onSuccess, onError, onLoading } = useStatus();

    const getAllConstructorsInAYear = useCallback(async (year: string) => {
        onLoading();
        obtainAllConstructorsInAYear(year)
        .then((response) => {
            setConstructors(response.MRData.ConstructorTable.Constructors);
            onSuccess(response
                ? `Constructors in ${response.MRData.ConstructorTable.season} fetched successfully`
                : '');
        })
        .catch((error) => {
            onError(error.message);
        });
    }, [onSuccess, onError, onLoading]);
    
    return {
        constructors, 
        getAllConstructorsInAYear,
        constructorStatus,
    };
}

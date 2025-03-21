import { useCallback, useState } from "react";
import { useStatus } from "./useStatus";
import { obtainDescription } from "../api/openai"; 

export const useGpt = () => {
    const [description, setDescription] = useState<string>(''); 
    const { status: descriptionStatus, onSuccess, onError, onLoading } = useStatus(); 

    const getDescription = useCallback(async (name: string) => {
        setDescription('');
        onLoading();
        try {
            const response = await obtainDescription(name);
            setDescription(response);
            onSuccess(`Descripción de ${name} obtenida correctamente.`);
        } catch (error: any) {
            onError(error.message || "Error obteniendo la descripción.");
        }
    }, [onSuccess, onError, onLoading]);

    return {
        description,
        getDescription,
        setDescription,
        descriptionStatus, 
    };
};

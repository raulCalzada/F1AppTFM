export interface Circuit {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
        lat: string;
        long: string;
        locality: string;
        country: string;
    };
}

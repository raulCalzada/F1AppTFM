const BaseUrl = '/flags-api';

export const obtainCountryImageFrom = async (countryCode: string) => {
    return `${BaseUrl}/${countryCode}/flat/64.png`;
}
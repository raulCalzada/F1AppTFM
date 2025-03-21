import { obtainCountryImageFrom } from "../api/flags";

export const demonymsToCountryCodes: { [key: string]: string } = {
    'American': 'US',
    'Argentinian': 'AR',
    'Australian': 'AU',
    'Austrian': 'AT',
    'Belgian': 'BE',
    'Brazilian': 'BR',
    'British': 'GB',
    'Canadian': 'CA',
    'Chilean': 'CL',
    'Chinese': 'CN',
    'Colombian': 'CO',
    'Danish': 'DK',
    'Dutch': 'NL',
    'Finnish': 'FI',
    'French': 'FR',
    'German': 'DE',
    'Hungarian': 'HU',
    'Indian': 'IN',
    'Indonesian': 'ID',
    'Irish': 'IE',
    'Italian': 'IT',
    'Japanese': 'JP',
    'Malaysian': 'MY',
    'Mexican': 'MX',
    'Monegasque': 'MC',
    'New Zealander': 'NZ',
    'Polish': 'PL',
    'Portuguese': 'PT',
    'Russian': 'RU',
    'South African': 'ZA',
    'Spanish': 'ES',
    'Swedish': 'SE',
    'Swiss': 'CH',
    'Thai': 'TH',
    'Turkish': 'TR',
    'Ukrainian': 'UA',
    'Venezuelan': 'VE',
};


export const demonymsToCountryImageUrl = async (demonym: string): Promise<string> => {
    const countryCode = demonymsToCountryCodes[demonym];
    if (!countryCode) {
        return 'Demonym not in database';
    }
    return await obtainCountryImageFrom(countryCode);
};
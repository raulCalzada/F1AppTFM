import axios from 'axios';

const BaseUrl = '/vote';

export const obtainQuestions = async() => {
    const response = await axios.get(`${BaseUrl}/all`);  
    return response.data;
};



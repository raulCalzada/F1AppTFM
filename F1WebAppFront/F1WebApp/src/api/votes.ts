import axios from 'axios';

const BaseUrl = '/vote';

export const obtainQuestions = async() => {
    const response = await axios.get(`${BaseUrl}/all`);  
    return response.data;
};

export const getVotesById = async(id: number) => {
    const response = await axios.get(`${BaseUrl}/${id}`);
    return response.data;
}

export const addNewQuestion = async (question: {question: string, status: number, options: string[]}) => {
    const response = await axios.post(`${BaseUrl}/create`, question);
    return response.data;
}

export const deleteQuestion = async (id: number) => {
    const response = await axios.delete(`${BaseUrl}/delete/${id}`);
    return response.data;
}

export const changeQuestionStatus = async(status: number, id: number) => {
    const response = await axios.put(`${BaseUrl}/status/${id}`, { status });
    return response.data;
}

export const vote = async(id: number,  option: string, userId: number ) => {
    const response = await axios.post(`${BaseUrl}/${id}`, {option, userId});
    return response.data;
}



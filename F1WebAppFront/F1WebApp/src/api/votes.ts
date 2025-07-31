import axios from 'axios';
import { VoteQuestion } from '../types/voteQuestion';

const BaseUrl = '/vote';

export const obtainQuestions = async() => {
    const response = await axios.get(`${BaseUrl}/all`);  
    return response.data;
};

export const obtainVoteById = async(questionId: string) => {
    const response = await axios.get(`${BaseUrl}/${questionId}`);  
    return response.data;
};

export const editVoteStatus = async(status:{"status": number, "question": number}) => {
    const response = await axios.put(`${BaseUrl}/${status.question}/status`, status);  
    return response.data;
}

export const createVotation = async(question : VoteQuestion) => {
    const response = await axios.post(`${BaseUrl}/create`, question);  
    return response.data;
}

export const vote = async(vote: {questionId: number, voteOption: number, userId: number}) => {
    const response = await axios.post(`${BaseUrl}/${vote.questionId}`, vote);  
    return response.data;
};

export const deleteQuestion = async(questionId: number) => {
    const response = await axios.delete(`${BaseUrl}/${questionId}`);  
    return response.data;
};

export const givePoints = async(data: { questionId: number, voteOption: number, points: number }) => {
    const response = await axios.post(`${BaseUrl}/give-points`, data);
    return response.data;
};
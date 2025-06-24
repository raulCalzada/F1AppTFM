import axios from 'axios';

const BaseUrl = '/quiz';

export const getAllQuizzes = async () => {
    const response = await axios.get(BaseUrl);
    return response.data;
};

export const obtainQuizById = async (quizId: number) => {
    console.log("Quiz ID:", quizId);
    const response = await axios.get(`${BaseUrl}/${quizId}`);
    console.log("Quiz data fetched:", response.data);
    return response.data;
};

export const getUserQuizzes = async (userId: number) => {
    const response = await axios.get(`${BaseUrl}/user/${userId}`);
    return response.data;
};

export const createQuiz = async (quizData: {
    title: string;
    description: string;
    totalScore: number;
    questions: {
        questionText: string;
        correctAnswer: string;
        answers: string[];
    }[];
}) => {
    const response = await axios.post(BaseUrl, quizData);
    return response.data;
};

export const submitQuiz = async (submitData: {quizId: number; userId: number; questionIds: number[]; answers: string[];}) => {
    console.log("Submitting quiz data:", submitData);
    const response = await axios.post(`${BaseUrl}/submit`, submitData);
    console.log("Quiz submission response:", response.data);
    return response.data;
};
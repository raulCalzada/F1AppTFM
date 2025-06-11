import axios from "axios";



const BaseUrl = '/forum';

export const obtainForumThreads = async () => {
    const response = await axios.get(`${BaseUrl}`);
    console.log(response);
    return response.data;
};

export const obtainForumThread = async (threadId: number) => {
    const response = await axios.get(`${BaseUrl}/${threadId}`);
    return response.data;
};

export const createForumThread = async (threadData: { title: string; content: string; userId: number }) => {
    const response = await axios.post(`${BaseUrl}`, threadData);
    return response.data;
};

export const createForumComment = async (commentData: { threadId: number; content: string; userId: number }) => {
    const response = await axios.post(`${BaseUrl}/comment`, commentData);
    return response.data;
};

export const deleteForumThread = async (threadId: number) => {
    const response = await axios.delete(`${BaseUrl}/${threadId}`);
    return response.data;
};

export const deleteForumThreadComment = async (commentId: number) => {
    console.log("request", commentId);
    const response = await axios.delete(`${BaseUrl}/comment/${commentId}`);
    console.log(response);
    return response.data;
};

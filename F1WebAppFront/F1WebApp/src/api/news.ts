import axios from 'axios';
import { Article } from '../types/article';

const BaseUrl = '/new';

export const obtainNews = async () => {
    console.log("Fetching news from:", BaseUrl);
    const response = await axios.get(`${BaseUrl}/news`);
    console.log("Response data:", response.data);
    return response.data;
};

export const obtainNewsById = async (id: string) => {
    const response = await axios.get(`${BaseUrl}/${id}`);
    return response.data;
};

export const createNews = async (newsData: Article) => {
    const response = await axios.post(`${BaseUrl}`, newsData);
    return response.data;
};

export const editNews = async (id: string, newsData: Article) => {
    console.log("Editing news with ID:", id);
    console.log("News data to update:", newsData);
    const response = await axios.put(`${BaseUrl}/${id}`, newsData);
    return response.data;
};

export const deleteNews = async (id: string) => {
    const response = await axios.delete(`${BaseUrl}/${id}`);
    return response.data;
};

export const createComment = async (commentData: { articleId: string; content: string; userId: number }) => {
    const response = await axios.post(`${BaseUrl}/${commentData.articleId}/comment`, commentData);
    return response.data;
}

export const deleteComment = async (newId: number, commentId: number) => {
    const response = await axios.delete(`${BaseUrl}/${newId}/comment/${commentId}`);
    return response.data;
};

export const updateComment = async (newId: number, commentId: number, content: string) => {
    const response = await axios.put(`${BaseUrl}/${newId}/comment/${commentId}`, { content });
    return response.data;
}




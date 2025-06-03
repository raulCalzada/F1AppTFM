import { User } from '../types/user';
import axios from 'axios';

const BaseUrl = '/user';

export const obtainUser = async (userId: string) => {
    const response = await axios.get(`${BaseUrl}/${userId}`);  
    return response.data;
};

export const obtainUserByUsername = async (username: string) => {
    const response = await axios.get(`${BaseUrl}/username/${username}`);
    return response.data;
}

export const deleteUser = async (userId: string) => {
    const response = await axios.delete(`${BaseUrl}/${userId}`);
    return response.data;
};

export const editUser = async (userId: string, userData: User) => {
    console.log('Updating user:', userId, userData);
    const response = await axios.put(`${BaseUrl}/${userId}`, userData);
    console.log('Update response:', response);
    return response.data;
};

export const createUser = async (userData: User) => {
    const response = await axios.post(`${BaseUrl}`, userData);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(`${BaseUrl}`);
    return response.data;
};
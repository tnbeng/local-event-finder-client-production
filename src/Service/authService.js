import axios from 'axios';
import { baseURL } from '../config';


export const register = async (name, email, password) => {
    const response = await axios.post(baseURL+'/api/users/register', { name, email, password });
    if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(baseURL + '/api/users/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
};

export const getUserProfile = async () => {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(baseURL + '/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const getAllUser=async () => {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(baseURL+'/api/users/all',{
        headers:{Authorization:`Bearer ${token}`}
    })
    return response.data;
}

export const updateUserProfile = async (name, email) => {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(baseURL + '/api/users/profile', { name, email }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('userToken');
};



import axios from 'axios';
// import { baseURL } from '../config';

const baseURL=process.env.REACT_APP_BASE_URL

export const register = async (name, email, password) => {
    const response = await axios.post(baseURL + '/api/users/register', { name, email, password });
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

export const getAllUser = async () => {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(baseURL + '/api/users/all', {
        headers: { Authorization: `Bearer ${token}` }
    })
    return response.data;
}

export const updateUserProfile = async (name, email,image) => {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(baseURL + '/api/users/profile',
        { name, email, image },
        { headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data'}}
    );
    return response.data;
};

export const deleteOneUser = async (id) => {
    const token = localStorage.getItem('userToken');
    const response = await axios.delete(baseURL + `/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};


export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(baseURL + '/api/users/password-reset-request', { email });
        return response.data; // Assume server returns a success message
    } catch (error) {
        console.error('Error requesting password reset:', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to request password reset');
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axios.post(baseURL + `/api/users/password-reset`,{token,newPassword});
        return response.data; 
    } catch (error) {
        console.error('Error resetting password:', error.response?.data || error.message);
        throw error.response?.data || new Error('Failed to reset password');
    }
};







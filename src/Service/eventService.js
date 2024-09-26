import axios from 'axios';
// import { baseURL } from '../config';
const baseURL=process.env.REACT_APP_BASE_URL
// Create a new event
export const createEvent = async (formData) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post(`${baseURL}/api/events`, 
            formData, 
            { headers: {
                 Authorization: `Bearer ${token}`,
                 'Content-Type': 'multipart/form-data'
            } }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating event:", error); // Added error handling
        throw error; // Re-throw error to handle it in the calling function
    }
};

// Get all events // Not required currently since achiving this functionality by searchEvents when proving empty object
export const getEvents = async () => {
    try {
        const response = await axios.get(`${baseURL}/api/events`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error); // Added error handling
        throw error; // Re-throw error to handle it in the calling function
    }
};

// Get a single event by ID
export const getEvent = async (eventId) => {
    try {
        const response = await axios.get(`${baseURL}/api/events/${eventId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching event:", error); // Added error handling
        throw error; // Re-throw error to handle it in the calling function
    }
};

// Update an event
export const updateEvent = async (eventId, title, description, date, location, category) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.put(`${baseURL}/api/events/${eventId}`, 
            { title, description, date, location, category },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating event:", error); // Added error handling
        throw error; // Re-throw error to handle it in the calling function
    }
};

// Delete an event
export const deleteEvent = async (eventId) => {
    try {
        const token = localStorage.getItem('userToken');
        const response = await axios.delete(`${baseURL}/api/events/${eventId}`, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting event:", error); // Added error handling
        throw error; // Re-throw error to handle it in the calling function
    }
};

// Search events
export const searchEvents = async (query) => {
    try {
        const response = await axios.get(`${baseURL}/api/events/search?${query}`);
        return response.data;
    } catch (error) {
        console.error("Error searching events:", error); // Added error handling
        throw error; // Re-throw error to handle it in the calling function
    }
};

// Search events
export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/api/events/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error searching events:", error); // Added error handling
        throw error; // Re-throw error to handle it in the calling function
    }
};

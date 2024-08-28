import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../Service/authService';
import axios from 'axios';
import { deleteEvent } from '../Service/eventService';


const Profile = () => {
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setUser(data.user);
                setEvents(data.events);
                setName(data.user.name);
                setEmail(data.user.email);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                alert(error);
                console.error(error);
            }
        };

        fetchProfile();
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const data = await updateUserProfile(name, email);
            setUser(data.user);
            setMessage('Profile updated successfully');
        } catch (error) {
            setMessage('Error updating profile');
            console.error(error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId);
            setEvents(events.filter(event => event._id !== eventId));
            setMessage('Event deleted successfully');
        } catch (error) {
            setMessage('Error deleting profile');
            console.error(error);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
            {message && <p className="text-green-500 text-center mb-4">{message}</p>}
            <form onSubmit={updateProfile} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                    Update Profile
                </button>
            </form>

            <h2 className="text-2xl font-bold text-center mb-4">Your Events</h2>
            <ul className="space-y-4">
                {events.map((event) => (
                    <li key={event._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <span className="text-lg">{event.title}</span>
                        <button onClick={() => handleDeleteEvent(event._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;

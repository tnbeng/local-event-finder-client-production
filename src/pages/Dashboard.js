import React, { useEffect, useState } from 'react';
import { deleteOneUser, getAllUser } from '../Service/authService';
import { deleteEvent, searchEvents } from '../Service/eventService';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchAllUsers();
        fetchAllEvents();
    }, []);

    const fetchAllUsers = async () => {
        const users = await getAllUser();
        setUsers(users);
    };

    const fetchAllEvents = async () => {
        const events = await searchEvents({});
        setEvents(events);
    };

    const deleteUser = async (id) => {
        await deleteOneUser(id);
        fetchAllUsers();
    };

    const deleteEventFun = async (id) => {
        await deleteEvent(id);
        fetchAllEvents();
    };

    return (
        <div className="p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex flex-col items-center">
            <h1 className="text-5xl font-bold text-white mb-10 text-center">Admin Dashboard</h1>

            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Manage Events */}
                <div className="bg-white rounded-xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Events</h2>
                    <ul className="space-y-6">
                        {events.map(event => (
                            <li key={event._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                                    <p className="text-gray-600">{event.location}</p>
                                </div>
                                <button
                                    onClick={() => deleteEventFun(event._id)}
                                    className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Manage Users */}
                <div className="bg-white rounded-xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h2>
                    <ul className="space-y-6">
                        {users.map(user => (
                            <li key={user._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                                <button
                                    onClick={() => deleteUser(user._id)}
                                    className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../Service/authService';
import { deleteEvent, updateEvent } from '../Service/eventService';
import ActionMessage from '../components/ActionMessage';

const Profile = () => {
    const [user, setUser] = useState({});
    const [events, setEvents] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [editingEvent, setEditingEvent] = useState(null);
    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: ''
    });

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
                setMessage('Error occured while fetching profile data ')
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
            setMessage('Error deleting event');
            console.error(error);
        }
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event._id);
        setEventForm({
            title: event.title,
            description: event.description,
            date: event.date.split('T')[0], // Remove time part from ISO date
            location: event.location,
            category: event.category
        });
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            // Pass individual fields to updateEvent
            const updatedEvent = await updateEvent(
                editingEvent,
                eventForm.title,
                eventForm.description,
                eventForm.date,
                eventForm.location,
                eventForm.category
            );
            setEvents(events.map((event) => (event._id === editingEvent ? updatedEvent : event)));
            setMessage('Event updated successfully');
            setEditingEvent(null); // Clear editing mode
            setEventForm({ title: '', description: '', date: '', location: '', category: '' });
        } catch (error) {
            setMessage('Error updating event');
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            {message && <ActionMessage message={message} setMessage={setMessage}/> }
            <h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>
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
                <div className='flex justify-end'>
                    <button type="submit" className=" p-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                        Update
                    </button>
                </div>
            </form>
            {editingEvent && (
                <div>
                    <form onSubmit={handleUpdateEvent} className="bg-white p-6 mt-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Edit Event</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={eventForm.title}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={eventForm.description}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="date">Date</label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                value={eventForm.date}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="location">Location</label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                value={eventForm.location}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="category">Category</label>
                            <input
                                id="category"
                                name="category"
                                type="text"
                                value={eventForm.category}
                                onChange={handleInputChange}
                                className="mt-1 p-2 border border-gray-300 rounded w-full"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                            Update Event
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditingEvent(null)}
                            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
            <h2 className="text-2xl font-bold text-center mb-4">Your Events</h2>
            <ul className="space-y-4">
                {events.map((event) => (
                    <li key={event._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                        <span className="text-lg">{event.title}</span>
                        <div>
                            <button onClick={() => handleEditEvent(event)} className="mr-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200">
                                Edit
                            </button>
                            <button onClick={() => handleDeleteEvent(event._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>


        </div>
    );
};

export default Profile;

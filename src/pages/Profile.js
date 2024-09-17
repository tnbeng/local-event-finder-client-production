import React, { useEffect, useState } from 'react';
import { getUserProfile, updateProfilePicture, updateUserProfile } from '../Service/authService';
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
    const [image, setImage]=useState(null);

    const [eventForm, setEventForm] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: ''
    });
    const [tab, setTab] = useState('events'); // New state for tab navigation

    useEffect(() => {
        fetchProfile();
    }, []);

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
            setMessage('Error occurred while fetching profile data');
            console.error(error);
        }
    };
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const data = await updateUserProfile(name, email, image);
            // setUser(data.user);
            fetchProfile();
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
            date: event.date.split('T')[0],
            location: event.location,
            category: event.category
        });
        setTab('editEvent'); // Switch to edit event tab
    };

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
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
            setEditingEvent(null);
            setEventForm({ title: '', description: '', date: '', location: '', category: '' });
            setTab('events'); // Switch back to events tab
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
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                {message && <ActionMessage message={message} setMessage={setMessage} />}

                {/* Profile Section */}
                <div className="flex items-center mb-8">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                        {/* {user.name ? user.name[0] : 'U'} */}
                        <img src={user.imageUrl} alt='imp' />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>
               
                <form onSubmit={updateProfile} className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Update Profile</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
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
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
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
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                            Photo
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept='image/*'
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                            Update Profile
                        </button>
                    </div>
                </form>

                {/* Tabs for event management */}
                <div className="mb-8">
                    <ul className="flex space-x-4 mb-4">
                        <li>
                            <button
                                onClick={() => setTab('events')}
                                className={`py-2 px-4 rounded-lg ${tab === 'events' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Your Events
                            </button>
                        </li>
                        {editingEvent && (
                            <li>
                                <button
                                    onClick={() => setTab('editEvent')}
                                    className={`py-2 px-4 rounded-lg ${tab === 'editEvent' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Edit Event
                                </button>
                            </li>
                        )}
                    </ul>
                    {tab === 'events' && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Events</h2>
                            <ul className="space-y-4">
                                {events.map((event) => (
                                    <li key={event._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                                            <p className="text-gray-600">{event.date}</p>
                                        </div>
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
                    )}
                    {tab === 'editEvent' && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <form onSubmit={handleUpdateEvent}>
                                <h3 className="text-xl font-semibold mb-4">Edit Event</h3>
                                <div className="mb-4">
                                    <label className="block text-gray-700" htmlFor="title">Title</label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        value={eventForm.title}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700" htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={eventForm.description}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border rounded-lg"
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
                                        className="w-full p-3 border rounded-lg"
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
                                        className="w-full p-3 border rounded-lg"
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
                                        className="w-full p-3 border rounded-lg"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                                        Update Event
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTab('events')}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;


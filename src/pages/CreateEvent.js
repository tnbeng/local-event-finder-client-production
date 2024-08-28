import React, { useState } from 'react';
import { createEvent } from '../Service/eventService';


const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEvent(title, description, date, location, category);
            setMessage('Event created successfully!');
            // Reset form fields after successful creation
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setCategory('');
        } catch (err) {
            setError('Error creating event. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Create New Event</h1>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700">Location</label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700">Category</label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;

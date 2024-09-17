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
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createEvent(title, description, date, location, category);
            setMessage('Event created successfully!');
            setError('');
            // Reset form fields after successful creation
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setCategory('');
        } catch (err) {
            setError('Error creating event. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center p-6">
            <div className="max-w-lg w-full bg-white bg-opacity-90 shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Event</h1>
                {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 ${error && !title ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 transition`}
                            required
                        />
                        {error && !title && <p className="text-red-500 text-sm">Title is required</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 ${error && !description ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 transition`}
                            required
                        ></textarea>
                        {error && !description && <p className="text-red-500 text-sm">Description is required</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700">Date</label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={`mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 ${error && !date ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 transition`}
                            required
                        />
                        {error && !date && <p className="text-red-500 text-sm">Date is required</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700">Location</label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={`mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 ${error && !location ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 transition`}
                            required
                        />
                        {error && !location && <p className="text-red-500 text-sm">Location is required</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-gray-700">Category</label>
                        <input
                            id="category"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 ${error && !category ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 transition`}
                            required
                        />
                        {error && !category && <p className="text-red-500 text-sm">Category is required</p>}
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;

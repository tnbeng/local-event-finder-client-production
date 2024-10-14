import React, { useState } from 'react';
import { createEvent } from '../Service/eventService';
import { toast } from 'react-toastify';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false)
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('location', location);
        formData.append('category', category);
        formData.append('image', image);

        try {
            const response = await createEvent(formData); // Send form data
            toast.success('Event created successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });
            // Reset form fields after successful creation
            setTitle('');
            setDescription('');
            setDate('');
            setLocation('');
            setCategory('');
            setImage(null);
            setLoading(false)
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating event', {
                position: 'top-right',
                autoClose: 3000,
            });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex flex-col items-center p-6">
            <div className="max-w-lg w-full bg-white bg-opacity-90 shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Event</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700">Image</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                            </>
                        ) : (
                            "Create Event"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateEvent;

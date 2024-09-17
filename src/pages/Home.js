import React, { useState, useEffect } from 'react';
import { searchEvents } from '../Service/eventService';
import Event from '../components/Event';
import ActionMessage from '../components/ActionMessage';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  // Function to fetch events with search and filter criteria
  const fetchEvents = async () => {
    try {
      const query = new URLSearchParams({
        keyword,
        category,
        date,
        location
      }).toString();
      const data = await searchEvents(query);
      setEvents(data);
    } catch (err) {
      setMessage('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [keyword, category, date, location]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-blue-500 text-white py-16">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-hero-image.jpg)' }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Upcoming Events</h1>
          <p className="text-lg mb-8">Find events near you and never miss out on the fun!</p>
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
            Explore Events
          </button>
        </div>
      </div>

      {/* Search and Filter Form */}
      <div className="container mx-auto px-4 py-8">
        {message && <ActionMessage message={message} setMessage={setMessage} />}
        <h2 className="text-3xl font-bold mb-6 text-center">Search and Filter Events</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border p-3 rounded-lg"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded-lg"
            >
              <option value="">All Categories</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              {/* Add more categories as needed */}
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-3 rounded-lg"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-3 rounded-lg"
            />
          </div>
          <div className="text-center mt-4">
            <button
              onClick={fetchEvents}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Event List */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <Event key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

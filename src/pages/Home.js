import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Event from '../components/Event';
import { baseURL } from '../config';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  // Function to fetch events with search and filter criteria
  const fetchEvents = async () => {
    try {
      const query = new URLSearchParams({
        keyword,
        category,
        date,
        location
      }).toString();

      const res = await axios.get(`${baseURL}/api/events/search?${query}`);
      setEvents(res.data);
    } catch (err) {
      console.log("Error ", err);
      alert("Something went wrong", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [keyword, category, date, location]); // Fetch events whenever search criteria change

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

      {/* Search and Filter Form */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded mr-2"
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
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={fetchEvents}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Event key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Home;

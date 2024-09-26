import React, { useState, useEffect } from 'react';
import { searchEvents } from '../Service/eventService';
import Event from '../components/Event';
import ActionMessage from '../components/ActionMessage';
import { FaSearch } from 'react-icons/fa';
import {toast} from 'react-toastify';


const Home = () => {
  const [events, setEvents] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

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
      toast.error(err.message,{position:'top-right',autoClose:3000})
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [keyword, category, date, location]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-blue-800">Discover Local Events</h1>
        <p className="text-blue-600 mt-2">Find amazing experiences near you</p>
      </header>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2 w-full md:w-2/5">
          <FaSearch className="text-blue-400" />
          <input
            type="text"
            placeholder="Search by keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="w-full md:w-1/5">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="art">Art</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        <div className="w-full md:w-1/5">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="w-full md:w-1/5">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Event List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length ? (
          events.map((event) => (
            <Event key={event._id} event={event} />
          ))
        ) : (
          <p className="text-center text-blue-600 col-span-full">No events found. Try refining your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

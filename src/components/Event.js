import React from 'react';
import { Link } from 'react-router-dom';

const Event = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Cover Image */}
      <div className="relative">
        <img src={event.image || 'https://via.placeholder.com/400x250'} alt={event.title} className="w-full h-64 object-cover" />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full p-4">
          <h2 className="text-2xl font-bold text-white">{event.title}</h2>
          <p className="text-sm text-gray-300">{event.date}</p>
        </div>
      </div>
      {/* Event Details */}
      <div className="p-4">
        <p className="text-gray-700">{event.description}</p>
        <p className="text-gray-500 mt-2">Location: {event.location}</p>
        <p className="text-gray-500">Category: {event.category}</p>
        <Link to={`/event/${event._id}`} className="block mt-4 text-blue-600 hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Event;

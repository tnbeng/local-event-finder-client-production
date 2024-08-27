import React from 'react';
import { Link } from 'react-router-dom';

const Event = ({ event }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p className="text-gray-600">{event.date}</p>
      <p className="text-gray-800">{event.description}</p>
      <p className="text-gray-600">{event.location}</p>
      <p className="text-gray-600">{event.category}</p>
      <Link to={`/event/${event._id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
};

export default Event;

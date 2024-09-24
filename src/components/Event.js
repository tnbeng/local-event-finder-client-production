import React from 'react';
import { Link } from 'react-router-dom';

const Event = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Event Image */}
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
      )}

      {/* Event Information */}
      <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
      <p className="text-gray-600 mt-2">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mt-2">{event.location}</p>
      <p className="text-gray-500 mt-2">{event.description}</p>

      {/* Category and Action */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm font-medium text-pink-600">{event.category}</span>
        <Link
          to={`/events/${event._id}`} // Assuming the detail page path is /events/:id
          className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Event;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../config';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(`${baseURL}/api/events/${id}`);
      setEvent(res.data);
    };
    fetchEvent();
  },[id]);

  if (!event) return <p>Loading...</p>;

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
    //   <p>{event.description}</p>
    //   <p>Date: {new Date(event.date).toLocaleDateString()}</p>
    //   <p>Location: {event.location}</p>
    //   <p>Category: {event.category}</p>
    // </div>
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${event.imageUrl || 'https://via.placeholder.com/1200x500'})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 flex flex-col justify-center items-center h-full text-center text-white">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <p className="text-lg mb-4">{event.date}</p>
          <p className="text-xl">{event.location}</p>
        </div>
      </div>

      {/* Event Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col mb-4 md:mb-0">
              <p className="text-gray-600 mb-2"><strong>Date:</strong> {event.date}</p>
              <p className="text-gray-600 mb-2"><strong>Location:</strong> {event.location}</p>
              <p className="text-gray-600"><strong>Category:</strong> {event.category}</p>
            </div>
            <div className="flex flex-col md:flex-row">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mb-4 md:mb-0 md:mr-4 text-center"
              >
                Register
              </a>
              <a
                href={`mailto:?subject=Check out this event&body=I thought you might be interested in this event: ${event.title}. ${window.location.href}`}
                className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 text-center"
              >
                Share
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="container mx-auto px-4 py-8 text-center">
        <Link
          to="/"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-900 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;

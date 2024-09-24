import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../Service/eventService'; // Assumes you have a service to fetch event details

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id); // Fetch event details by ID
        setEvent(data);
      } catch (err) {
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
      )}
      <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
      <p className="text-gray-600 mt-2">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mt-2">{event.location}</p>
      <p className="text-gray-800 mt-4">{event.description}</p>
      <span className="text-sm font-medium text-pink-600 mt-4">{event.category}</span>
    </div>
  );
};

export default EventDetails;

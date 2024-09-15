import React, { useEffect, useState } from 'react'
import { getAllUser } from '../Service/authService'
import UserCard from '../components/UserCard';
import { searchEvents } from '../Service/eventService';
import Event from '../components/Event';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            const users = await getAllUser();
            setUsers(users);
        }
        const fetchAllEvents = async () => {
            const events = await searchEvents({});
            setEvents(events);
        }
        fetchAllUsers();
        fetchAllEvents();
    }, [])
    console.log("Events ",events)
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className=''>
                <table class='min-w-full border-collapse border border-gray-300'>
                    <thead >
                        <tr >
                            <th className='border border-gray-300 px-4 py-2'>Sl No</th>
                            <th className='border border-gray-300 px-4 py-2'>Name </th>
                            <th className='border border-gray-300 px-4 py-2'>Email</th>
                            <th className='border border-gray-300 px-4 py-2'>Edit</th>
                            <th className='border border-gray-300 px-4 py-2'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, key) =>
                            <tr>
                                <td className='border border-gray-300 px-4 py-2'>{key + 1}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user.name}</td>
                                <td className='border border-gray-300 px-4 py-2'>{user.email}</td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    <button className="mr-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200">
                                     Edit
                                    </button>
                                </td>
                                <td className='border border-gray-300 px-4 py-2'> <button className="mr-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200">
                                    Delete
                                </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <div className='grid grid-cols-2 gap-2'>
            <div>
                <table class='min-w-full border-collapse border border-gray-300'>
                    <thead >
                        <tr >
                            <th className='border border-gray-300 px-4 py-2'>Sl No</th>
                            <th className='border border-gray-300 px-4 py-2'>Event Name</th>
                            <th className='border border-gray-300 px-4 py-2'>Event Location</th>
                            <th className='border border-gray-300 px-4 py-2'>Edit</th>
                            <th className='border border-gray-300 px-4 py-2'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, key) =>
                            <tr>
                                <td className='border border-gray-300 px-4 py-2'>{key + 1}</td>
                                <td className='border border-gray-300 px-4 py-2'>{event.title}</td>
                                <td className='border border-gray-300 px-4 py-2'>{event.location}</td>
                                <td className='border border-gray-300 px-4 py-2'>
                                    <button className="mr-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200">
                                     Edit
                                    </button>
                                </td>
                                <td className='border border-gray-300 px-4 py-2'> <button className="mr-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200">
                                    Delete
                                </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
            </div>
        </div>

    )
}

export default Dashboard
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({user}) => {
    return (
        <div className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            {/* <p className="text-gray-800">{event.description}</p>
              <p className="text-gray-600">{event.location}</p>
              <p className="text-gray-600">{event.category}</p> */}
            <Link to={`/event/${user._id}`} className="text-blue-500 hover:underline">
                View Details
            </Link>
        </div>
    )
}

export default UserCard
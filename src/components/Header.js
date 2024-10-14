import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from '../context/Context';

import io from 'socket.io-client';

const Header = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // State to track unread notifications
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showNotifications) {
      markNotificationsAsRead(); // Mark notifications as read when opened
    }
  };
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/events/notifications/${user._id}`);
      setNotifications(response.data);
      // Count unread notifications
      const unread = response.data.filter(notification => !notification.isRead).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/events/notifications/${user._id}/mark-as-read`);
      fetchNotifications(); // Re-fetch notifications to update state
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  useEffect(() => {
    let socket;

    if (user) {
      fetchNotifications();

      // Initialize the socket connection only after the user is authenticated
      // socket = io('http://localhost:8081');
      socket = io(`${process.env.REACT_APP_BASE_URL}`);

      // Listen for new notifications
      socket.on('newNotification', (newNotifications) => {
        fetchNotifications(); //if new notification is create i will fetch all notification again to see any update 
      });

    }

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  return (
    <header className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4 text-white shadow-lg sticky top-0 w-full z-10">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-extrabold tracking-tight">
          <Link to="/" className="hover:text-gray-300 transition duration-300">Local Event Finder</Link>
        </div>

        {user && (
          <div className="relative">
            <button onClick={toggleNotifications} className="focus:outline-none">
              <FaBell className="w-6 h-6 text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
                <ul className="max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="p-2">No new notifications</li>
                  ) : (
                    notifications.map((notification) => (
                      <li key={notification._id} className="p-2 hover:bg-gray-200">
                        {notification.message}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        <button className="block lg:hidden focus:outline-none" onClick={toggleMenu}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <nav className="hidden lg:flex space-x-6 font-semibold">
          <Link to="/" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">Home</Link>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/dashboard" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">Dashboard</Link>
              )}
              <Link to="/create-event" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">Create Event</Link>
              <Link to="/profile" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">Profile</Link>
              <button onClick={handleLogout} className="hover:bg-red-500 bg-red-600 px-4 py-2 rounded text-white transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">Login</Link>
              <Link to="/register" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">Register</Link>
            </>
          )}
        </nav>
      </div>

      {isOpen && (
        <nav className="lg:hidden mt-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg p-4 shadow-md">
          <ul className="flex flex-col space-y-4 text-lg">
            <li>
              <Link to="/" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">Home</Link>
            </li>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <li>
                    <Link to="/dashboard" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">Dashboard</Link>
                  </li>
                )}
                <li>
                  <Link to="/create-event" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">Create Event</Link>
                </li>
                <li>
                  <Link to="/profile" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:bg-red-500 bg-red-600 px-4 py-2 rounded text-white transition duration-300">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">Login</Link>
                </li>
                <li>
                  <Link to="/register" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;


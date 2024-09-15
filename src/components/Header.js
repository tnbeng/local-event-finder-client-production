import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Service/authService';

const Header = ({ user, appState }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    appState(null);
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center bg-blue-600 p-4 text-white">
      <div className='text-xl'>Local Event Finder</div>
      <nav>
        <ul className="flex  items-center space-x-4">
          <li>
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link>
          </li>
          {user ? (
            <>
              {user &&
                <li>
                  <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashbord</Link>
                </li>
              }
              <li>
                <Link to="/create-event" className="hover:bg-blue-700 px-3 py-2 rounded">Create Event</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:bg-blue-700 px-3 py-2 rounded">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:bg-blue-700 px-3 py-2 rounded">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

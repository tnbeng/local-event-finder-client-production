import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 p-4 text-white">
      <nav>
        <ul className="flex  items-center space-x-4">
          <li>
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">Home</Link>
          </li>
          {user && (
            <li>
              <Link to="/create-event" className="hover:bg-blue-700 px-3 py-2 rounded">Create Event</Link>
            </li>
          )}
          {!user ? (
            <>
              <li>
                <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout} className="hover:bg-blue-700 px-3 py-2 rounded">Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

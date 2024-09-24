import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Context';

const Header = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle mobile menu
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-4 text-white shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-tight">
          <Link to="/" className="hover:text-gray-300 transition duration-300">Local Event Finder</Link>
        </div>
        
        {/* Mobile menu button */}
        <button
          className="block lg:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Links for larger screens */}
        <nav className="hidden lg:flex space-x-6 font-semibold">
          <Link to="/" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">
            Home
          </Link>
          {user ? (
            <>
              {user.role=='admin' && (
                <Link to="/dashboard" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">
                  Dashboard
                </Link>
              )}
              <Link to="/create-event" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">
                Create Event
              </Link>
              <Link to="/profile" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="hover:bg-red-500 bg-red-600 px-4 py-2 rounded text-white transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">
                Login
              </Link>
              <Link to="/register" className="hover:bg-white hover:text-blue-600 px-4 py-2 rounded transition duration-300">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Dropdown menu for mobile */}
      {isOpen && (
        <nav className="lg:hidden mt-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg p-4 shadow-md">
          <ul className="flex flex-col space-y-4 text-lg">
            <li>
              <Link to="/" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">
                Home
              </Link>
            </li>
            {user ? (
              <>
                {user.role==='admin' && <li>
                  <Link to="/dashboard" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">
                    Dashboard
                  </Link>
                </li>
                }
                <li>
                  <Link to="/create-event" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">
                    Create Event
                  </Link>
                </li>
                <li>
                  <Link to="/profile" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:bg-red-500 bg-red-600 px-4 py-2 rounded text-white transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={toggleMenu} className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition duration-300">
                    Register
                  </Link>
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

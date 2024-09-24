import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { login } from '../Service/authService';
import { UserContext } from '../context/Context';

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      loginUser(user);
      navigate('/');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white bg-opacity-90 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-lg font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-lg font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg shadow-lg hover:from-teal-600 hover:to-blue-600 transition"
          >
            Login
          </button>
        </form>
        {/* Links for Register and Forgot Password */}

        <p className="mt-4 text-center">
          Don't have an account?
          <Link to="/register" className="text-blue-500 hover:underline"> Register here</Link>
        </p>
        
        <p className="mt-2 text-center">
          <Link to="/forgot-password" className="text-blue-500">Forgot your password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

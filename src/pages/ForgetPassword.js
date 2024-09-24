import React, { useState } from 'react';
import { requestPasswordReset } from '../Service/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset(email);
      setMessage(response.message || 'Password reset email sent. Check your inbox.');
      setError('');
    } catch (error) {
      setMessage('');
      setError('Failed to send password reset email.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white bg-opacity-90 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-lg font-medium">Enter your email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>
          {message && <div className="text-green-500 font-medium">{message}</div>}
          {error && <div className="text-red-500 font-medium">{error}</div>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg shadow-lg hover:from-teal-600 hover:to-blue-600 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

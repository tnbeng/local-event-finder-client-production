// src/pages/ErrorPage.js

import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-2xl mb-4">Oops! Page not found.</p>
            <p className="mb-6">The page you're looking for does not exist.</p>
            <Link to="/" className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                Go to Home
            </Link>
        </div>
    );
};

export default ErrorPage;

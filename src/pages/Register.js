import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { login, register } from '../Service/authService';
import { UserContext } from '../context/Context';
import { toast } from 'react-toastify';

const Register = () => {
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await register(name, email, password);
            loginUser(user);
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || "An Error occured.Please try again later", {
                position: 'top-right',
                autoClose: 3000,
            });

        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white bg-opacity-90 shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-lg font-medium">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                            required
                        />
                    </div>
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
                        Register
                    </button>
                </form>

                {/* Link to the Login Page */}
                <p className="mt-4 text-center">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 hover:underline"> Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

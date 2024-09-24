import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/Context';
import ErrorPage from './pages/ErrorPage';
import ForgotPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';


const App = () => {
 
  return (
    <UserProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<ProtectedRoute  requiredRole="admin"><Dashboard /></ProtectedRoute>} />
            <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password/:token" element={<ResetPassword/>} />
            <Route path="*" element={<ErrorPage />} /> 
          </Routes>
        </main>
      </Router>
    </UserProvider>
  );
};

export default App;

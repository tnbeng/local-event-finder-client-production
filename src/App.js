import React, { useState, useEffect, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import ForgotPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/Context';


const App = () => {
  const {user}=useContext(UserContext);

  return (
      <Router>
        <Header />
        <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={user?.role=="admin" ? <Dashboard />:<Login/>} />
              <Route path="/create-event" element={user ? <CreateEvent />:<Login/>} />
              <Route path="/profile" element={user ? <Profile />:<Login/>} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
        </main>
        <ToastContainer />
      </Router>
  );
};

export default App;
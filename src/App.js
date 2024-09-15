import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { getUserProfile } from './Service/authService';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';


const App = () => {
  const [user, setUser] = useState('');

  useEffect(()=>{
    const data = getUserProfile();
    setUser(data);
  },[])

  return (
    <Router>
      <Header user={user} appState={setUser}/>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/create-event" element={<ProtectedRoute  user={user}><CreateEvent /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute  user={user}><Profile/></ProtectedRoute>} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login appState={setUser} />} />
          <Route path="/register" element={<Register appState={setUser} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;

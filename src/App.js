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


const App = () => {
  const [user, setUser] = useState(null);
  console.log("User data in app",user);
  useEffect(() => {
    const userInfo = getUserProfile();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const appState = (userInfo) => {
    setUser(userInfo);
  };

  return (
    <Router>
      <Header user={user} setUser={setUser}/>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<ProtectedRoute user={user}><CreateEvent /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login appState={appState} />} />
          <Route path="/register" element={<Register appState={appState} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;

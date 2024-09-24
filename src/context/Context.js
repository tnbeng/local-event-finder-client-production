// src/context/UserContext.js

import React, { createContext, useState, useEffect } from 'react';
import { getUserProfile } from '../Service/authService';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await getUserProfile();

        setUser(user);
      } catch (error) {
        setUser(null);
      }
    };
    const token=localStorage.getItem('userToken');
    if(token)
    {
      fetchUserProfile();
    }
    
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("userToken");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

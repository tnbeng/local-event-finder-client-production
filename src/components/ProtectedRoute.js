import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/Context';

const ProtectedRoute = ({children }) => {
  const user=useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if(user.email=='btarak398@gmail.com')
  {
    return <Navigate to="/dashboard" />
  }
  
  return children;
};

export default ProtectedRoute;

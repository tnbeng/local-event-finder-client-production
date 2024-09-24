import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/Context';

const ProtectedRoute = ({children , requiredRole}) => {
  const {user} =useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (requiredRole && user.role !==requiredRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;

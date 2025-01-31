import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return null; // Or a loading spinner
  }

  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
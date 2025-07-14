import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = useSelector(state => state.user.token);
  const localToken = localStorage.getItem('token');
  
  const isAuthenticated = token || localToken;
  
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

export default PublicRoute;
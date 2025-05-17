import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from './AuthService';

const AuthRoute = ({ children }) => {
  if (AuthService.isUserAuthenticated()) {
    return <Navigate to="/home" replace />;
  }
  
  if (AuthService.isCaptainAuthenticated()) {
    return <Navigate to="/captain-home" replace />;
  }

  return children;
};

export default AuthRoute;
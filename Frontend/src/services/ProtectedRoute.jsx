import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const currentRole = AuthService.getCurrentRole();
  
  if (!currentRole) {
    return <Navigate to={AuthService.getLoginRoute()} replace />;
  }

  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to={AuthService.getHomeRoute()} replace />;
  }

  return children;
};

export default ProtectedRoute;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const InvalidRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on authentication status
    if (AuthService.isUserAuthenticated()) {
      navigate('/home');
    } else if (AuthService.isCaptainAuthenticated()) {
      navigate('/captain-home');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600">Redirecting you to the appropriate page...</p>
      </div>
    </div>
  );
};

export default InvalidRoute;
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

export const useUserAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.isUserAuthenticated()) {
      navigate('/home');
    } else if (AuthService.isCaptainAuthenticated()) {
      navigate('/captain-home');
    }
  }, [AuthService.isUserAuthenticated, AuthService.isCaptainAuthenticated]);

  return {
    isAuthenticated: AuthService.isUserAuthenticated(),
    user: AuthService.getUserData(),
    setAuth: (token, user) => {
      AuthService.setUserToken(token);
      AuthService.setUserData(user);
    },
    clearAuth: AuthService.clearAuth,
  };
};

export const useCaptainAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.isCaptainAuthenticated()) {
      navigate('/captain-home');
    } else if (AuthService.isUserAuthenticated()) {
      navigate('/home');
    }
  }, [navigate]);

  return {
    isAuthenticated: AuthService.isCaptainAuthenticated(),
    captain: AuthService.getCaptainData(),
    setAuth: (token, captain) => {
      AuthService.setCaptainToken(token);
      AuthService.setCaptainData(captain);
    },
    clearAuth: AuthService.clearAuth,
  };
};
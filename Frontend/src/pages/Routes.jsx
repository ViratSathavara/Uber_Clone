import StartPage from './StartPage';
import Login from './UserPages/Login';
import Signup from './UserPages/Signup';
import CaptainLogin from './CaptainPages/CaptainLogin';
import CaptainSignup from './CaptainPages/CaptainSignup';
import Home from './UserPages/Home';
import CaptainHome from './CaptainPages/CaptainHome';
import UserLogout from './UserPages/UserLogout';
import CaptainLogout from './CaptainPages/CaptainLogout';
import LookingForDriver from '../CommonComponents/LookingForDriver';
import UserRiding from './UserPages/UserRiding';
import InvalidRoute from '../CommonComponents/InvalidRoute';
import ProtectedRoute from '../services/ProtectedRoute';
import AuthRoute from '../services/AuthRoute';
import CaptainRiding from './CaptainPages/CaptainRiding';

export const ROUTES = {
  ROOT: {
    path: '/',
    element: <StartPage />,
  },
  LOGIN: {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  SIGNUP: {
    path: '/signup',
    element: (
      <AuthRoute>
        <Signup />
      </AuthRoute>
    ),
  },
  CAPTAIN_LOGIN: {
    path: '/captainlogin',
    element: (
      <AuthRoute>
        <CaptainLogin />
      </AuthRoute>
    ),
  },
  CAPTAIN_SIGNUP: {
    path: '/captainsignup',
    element: (
      <AuthRoute>
        <CaptainSignup />
      </AuthRoute>
    ),
  },
  HOME: {
    path: '/home',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <Home />
      </ProtectedRoute>
    ),
  },
  CAPTAIN_HOME: {
    path: '/captain-home',
    element: (
      <ProtectedRoute allowedRoles={['captain']}>
        <CaptainHome />
      </ProtectedRoute>
    ),
  },
  USER_LOGOUT: {
    path: '/logout',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <UserLogout />
      </ProtectedRoute>
    ),
  },
  CAPTAIN_LOGOUT: {
    path: '/captain-logout',
    element: (
      <ProtectedRoute allowedRoles={['captain']}>
        <CaptainLogout />
      </ProtectedRoute>
    ),
  },
  LOOKING_FOR_DRIVER: {
    path: '/lookingfordriver',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <LookingForDriver />
      </ProtectedRoute>
    ),
  },
  RIDING: {
    path: '/riding',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <UserRiding />
      </ProtectedRoute>
    ),
  },
  CAPTAIN_RIDING: {
    path: '/captain-riding',
    element: (
      <ProtectedRoute allowedRoles={['captain']}>
        <CaptainRiding />
      </ProtectedRoute>
    ),
  },
  // Catch-all route for invalid paths
  NOT_FOUND: {
    path: '*',
    element: <InvalidRoute />,
  },
};

export const ROUTE_PATHS = Object.keys(ROUTES).reduce((acc, key) => {
  acc[key] = ROUTES[key].path;
  return acc;
}, {});
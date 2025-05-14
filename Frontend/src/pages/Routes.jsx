import StartPage from './StartPage';
import Login from './Login';
import Signup from './Signup';
import CaptainLogin from './CaptainLogin';
import CaptainSignup from './CaptainSignup';
import Home from './Home';
import CaptainHome from './CaptainHome';
import UserLogout from './UserLogout';
import CaptainLogout from './CaptainLogout';
import LookingForDriver from '../CommonComponents/LookingForDriver';
import UserProtectWrapper from './UserProtectWrapper';
import CaptainProtectWrapper from './CaptainProtectWrapper';

export const ROUTES = {
  ROOT: {
    path: '/',
    element: <StartPage />,
  },
  LOGIN: {
    path: '/login',
    element: <Login />,
  },
  SIGNUP: {
    path: '/signup',
    element: <Signup />,
  },
  CAPTAIN_LOGIN: {
    path: '/captainlogin',
    element: <CaptainLogin />,
  },
  CAPTAIN_SIGNUP: {
    path: '/captainsignup',
    element: <CaptainSignup />,
  },
  LOOKING_FOR_DRIVER: {
    path: '/lookingfordriver',
    element: <LookingForDriver />,
  },
  HOME: {
    path: '/home',
    element: <UserProtectWrapper><Home /></UserProtectWrapper>,
  },
  CAPTAIN_HOME: {
    path: '/captain-home',
    element: <CaptainProtectWrapper><CaptainHome /></CaptainProtectWrapper>,
  },
  USER_LOGOUT: {
    path: '/logout',
    element: <UserProtectWrapper><UserLogout /></UserProtectWrapper>,
  },
  CAPTAIN_LOGOUT: {
    path: '/captain-logout',
    element: <CaptainProtectWrapper><CaptainLogout /></CaptainProtectWrapper>,
  },
};

export const ROUTE_PATHS = Object.keys(ROUTES).reduce((acc, key) => {
  acc[key] = ROUTES[key].path;
  return acc;
}, {});
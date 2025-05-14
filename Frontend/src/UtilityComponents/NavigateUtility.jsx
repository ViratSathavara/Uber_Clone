// src/utils/navigation.js
import { ROUTE_PATHS } from '../pages/Routes';
import { useNavigate } from 'react-router-dom';

// Hook for functional components
export const useNavigation = () => {
  const navigate = useNavigate();
  return {
    navigateTo: (routeKey, state = {}) => navigate(ROUTE_PATHS[routeKey], { state }),
    goBack: () => navigate(-1),
  };
};

// Class component helper (if needed)
export const withNavigation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigateTo={navigate} />;
  };
};
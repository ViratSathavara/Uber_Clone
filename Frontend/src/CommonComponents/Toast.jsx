import { toast, Flip  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: 'bottom-center',
    autoClose: 3000, // 3 seconds
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    limit: 3,
    theme: 'dark',
    transition: Flip,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    limit: 3,
    theme: 'dark',
    transition: Flip,
  });
};

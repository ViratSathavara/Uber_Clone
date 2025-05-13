import React from 'react'
import { UserDataContext } from '../context/UserContext'
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const Home = () => {
  const { user } = React.useContext(UserDataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token')


  // const handleLogout = async () => {
  //   try {

  //     const response = await axios.get(`http://localhost:4000/users/logout`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('user');
  //       navigate('/login');
  //     }
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };
  
  return (
       <>
    <h1>
      Welcome <b>User</b> {user?.data?.user?.fullname?.firstname} {user?.data?.user?.fullname?.lastname}
    </h1>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        // onClick={handleLogout}
        className="!py-3 !bg-black hover:bg-gray-900 text-white font-medium rounded-lg shadow-sm transition-colors duration-300"
        >
        Logout
      </Button>
        </>  
  )
}

export default Home
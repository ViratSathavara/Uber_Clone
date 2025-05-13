import React from 'react'
import { UserDataContext } from '../context/UserContext'
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {
    const { captain } = React.useContext(CaptainDataContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')


    //   const handleLogout = async () => {
    //     try {
    //       const endpoint = role === 'user' ? 'users' : 'captain';

    //       const response = await axios.get(`http://localhost:4000/${endpoint}/logout`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });

    //       if (response.status === 200) {
    //         localStorage.removeItem('token');
    //         localStorage.removeItem(role); // remove user or captain from localStorage
    //         localStorage.removeItem('role'); // remove role if stored
    //         navigate('/login');
    //       }
    //     } catch (error) {
    //       console.error('Logout failed:', error);
    //     }
    //   };

    return (
            <>
                <h1>
                    Welcome <b>Captain</b> {captain?.fullname?.firstname} {captain?.fullname?.lastname}
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

export default CaptainHome
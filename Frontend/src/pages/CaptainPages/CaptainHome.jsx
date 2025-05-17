import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CaptainDataContext } from '../../context/CaptainContext';
import axios from 'axios';
import { useNavigation } from '../../UtilityComponents/NavigateUtility';
import CaptainDetails from './CaptainDetails';
import { Button } from '@mui/material';
import RidePopup from './RidePopup';
import BackButton from '../../CommonComponents/BackButton';
import ConfirmRidePopup from './ConfirmRidePopup';

const CaptainHome = () => {
    const { navigateTo } = useNavigation();
    const [openPopup, setOpenPopup] = useState(true)
    const [confirmRidePopup, setConfirmRidePopup] = useState(false)
    const { captain } = React.useContext(CaptainDataContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token')


    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className="h-1/2 relative">
                <img
                    className="w-full h-full object-cover" src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center" alt="image" />
                <button
                    onClick={() => {
            localStorage.removeItem('captain_token')
            localStorage.removeItem('captain_data')
            window.location.href = '/login';
          }
          }
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                >
                    <LogoutOutlinedIcon />
                </button>
            </div>
            <div className='h-1/2 '>
                <CaptainDetails />
            </div>
            <div className={`p-3 flex flex-col gap-3 fixed left-0 w-full bg-white shadow-lg transition-all duration-[500ms] z-50 ${openPopup ? 'translate-y-0' : 'translate-y-full'} bottom-0`}>
               <BackButton
          onClick={() => {
            setOpenPopup(false);
          }}
        />
                <RidePopup setOpenPopup={setOpenPopup} setConfirmRidePopup={setConfirmRidePopup} />
            </div>
            <div className={`p-3 flex flex-col h-screen gap-3 fixed left-0 w-full bg-white shadow-lg transition-all duration-[500ms] z-50 ${confirmRidePopup ? 'translate-y-0' : 'translate-y-full'} bottom-0`}>
               <BackButton
          onClick={() => {
            setConfirmRidePopup(false);
          }}
        />
                <ConfirmRidePopup setConfirmRidePopup={setConfirmRidePopup} setOpenPopup={setOpenPopup} />
            </div>

        </div>
    )
}

export default CaptainHome
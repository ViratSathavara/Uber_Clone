import React, { useState } from 'react'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BackButton from '../../CommonComponents/BackButton';
import { Button, Typography } from '@mui/material';
import FinishRide from './FinishRide';

const CaptainRiding = () => {
    const [finishRidePopup, setFinishRidePopup] = useState(false);
    
    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className="h-4/5 relative">
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
            <div className='flex flex-col justify-start items-center bg-amber-300 h-1/5 '>
                <div className='mb-6'>
                    <BackButton
                        onClick={() => {
                            setConfirmRidePopup(false);
                        }}
                    />
                </div>
                <div className='flex justify-evenly items-center w-full '>
                    <Typography className=''>4 KM away</Typography>

                    <Button
                        onClick={() => {
                            setFinishRidePopup(true);
                        }}
                        variant='contained'
                        className='!bg-green-500 hover:!bg-green-700 text-white font-bold py-2 px'
                    >
                        Complete Ride
                    </Button>
                </div>
            </div>
            <div className={`p-3 flex flex-col h-screen gap-3 fixed left-0 w-full bg-white shadow-lg transition-all duration-[1000ms] z-50 ${finishRidePopup ? 'translate-y-0' : 'translate-y-full'} bottom-0`}>
        <FinishRide />
      </div>
        </div>
    )
}

export default CaptainRiding
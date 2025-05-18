import React, { useState } from 'react'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BackButton from '../../CommonComponents/BackButton';
import { Button, Typography } from '@mui/material';
import FinishRide from './FinishRide';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigation } from '../../UtilityComponents/NavigateUtility';
import LiveTracking from '../../CommonComponents/LiveTracking';

const CaptainRiding = () => {
    const { navigateTo } = useNavigation();
    const location = useLocation();

    const finishRidePopup = async () => {

        const response = await axios.post(`${import.meta.env.VITE_BASE_HOSTED_URI}/ride/end-ride`,
            {
                rideId: location?.state._id,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('captain_token')}`,
                    'Content-Type': 'application/json'
                }
            })

            

        if (response.status === 200) {
         navigateTo('CAPTAIN_HOME');
        }

        console.log(response)

    }

    console.log(location?.state)

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className="h-1/2 relative">
                <LiveTracking />
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
            <div className='flex flex-col h-1/2 overflow-auto p-2 justify-start items-center bg-white'>
                <div className='mb-6'>
                    <BackButton
                        onClick={() => {
                            setConfirmRidePopup(false);
                        }}
                    />
                </div>
                <div className='flex flex-col w-full border-1 border-gray-400 rounded-lg p-3'>
                    <div className="p-4 border-b border-gray-200">
                        <h2 className='text-2xl font-bold'>{location?.state?.user?.fullname?.firstname + " " + location?.state?.user?.fullname?.lastname}</h2>
                    </div>
                    <div className="p-4 border-b border-gray-200">
                        <div className='flex gap-1'>
                            <AddLocationIcon className="text-black text-3" />
                            <h1 className="text-sm font-medium text-gray-500">Pickup Location</h1>
                        </div>
                        <h3 className="text-black">{location?.state?.fullPickup?.structured_formatting?.main_text}</h3>
                        <p className="text-gray-600">{location?.state?.pickup}</p>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                        <div className='flex gap-1'>
                            <WhereToVoteIcon className="text-black text-3" />
                            <h1 className="text-sm font-medium text-gray-500">Destination Location</h1>
                        </div>
                        <h3 className="text-black">{location?.state?.fullDestination?.structured_formatting?.main_text}</h3>
                        <p className="text-gray-600">{location?.state?.destination}</p>
                    </div>

                    <Button
                        onClick={() => {
                            finishRidePopup()
                        }}
                        variant='contained'
                        className='!bg-green-500 hover:!bg-green-700 text-white font-bold py-2 px'
                    >
                        Complete Ride
                    </Button>
                </div>
            </div>
            {/* <div className={`p-3 flex flex-col h-screen gap-3 fixed left-0 w-full bg-white shadow-lg transition-all duration-[1000ms] z-50 ${finishRidePopup ? 'translate-y-0' : 'translate-y-full'} bottom-0`}>
                <FinishRide />
            </div> */}
        </div>
    )
}

export default CaptainRiding
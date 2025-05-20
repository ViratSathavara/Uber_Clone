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
import { SocketProvider, useSocket } from '../../context/SocketContext';
import { useEffect } from 'react';
import LiveTracking from '../../CommonComponents/LiveTracking';

const CaptainHome = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [confirmRidePopup, setConfirmRidePopup] = useState(false)
    const { captain } = React.useContext(CaptainDataContext);
    const token = localStorage.getItem('captain_token')
    const { socket, sendMessage, receiveMessage } = useSocket();
    const [ride, setRide] = useState(null);
    const [confirmRideData, setConfirmRideData] = useState(null);


    useEffect(() => {
        sendMessage('join', {
            captainId: captain._id,
            userType: 'captain',
        })

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {


                    socket.emit('update-location-captain', {
                        captainId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(() => { updateLocation() }, 5000)
        return () => {
            clearInterval(locationInterval);
        }
    }, []);

    socket.on('new-ride', (data) => {
        console.log('new-ride', data)
        setRide(data);
        setOpenPopup(true);
    })

    const confirmRide = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_HOSTED_URI}/ride/confirm-ride`, {
                rideId: ride._id,
                captain: captain,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setConfirmRideData(response?.data);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            <div className="h-full relative">
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
            <div className='h-1/2 '>
                <CaptainDetails />
            </div>
            <div className={`p-3 flex flex-col gap-3 fixed left-0 w-full bg-white shadow-lg transition-all duration-[500ms] z-50 ${openPopup ? 'translate-y-0' : 'translate-y-full'} bottom-0`}>
                <BackButton
                    onClick={() => {
                        setOpenPopup(false);
                    }}
                />
                <RidePopup confirmRide={confirmRide} ride={ride} setOpenPopup={setOpenPopup} setConfirmRidePopup={setConfirmRidePopup} />
            </div>
            <div className={`p-3 flex flex-col h-screen gap-3 fixed left-0 w-full bg-white shadow-lg transition-all duration-[500ms] z-50 ${confirmRidePopup ? 'translate-y-0' : 'translate-y-full'} bottom-0`}>
                <BackButton
                    onClick={() => {
                        setConfirmRidePopup(false);
                    }}
                />
                <ConfirmRidePopup confirmRideData={confirmRideData} setConfirmRidePopup={setConfirmRidePopup} setOpenPopup={setOpenPopup} />
            </div>

        </div>
    )
}

export default CaptainHome
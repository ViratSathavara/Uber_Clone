import React from 'react';
import waitingForDriverVideo from '../assets/waitingfordriver.mp4';
import { useLocation } from 'react-router-dom';
import BackButton from './BackButton';

const LookingForDriver = ({ setRideStatus, setVehiclePanel, setConfirmRide, setVehicle, timeoutRef }) => {
    // const location = useLocation();
    // const selectedVehicle = location?.state?.selectedVehicle;
    // const selectedLocation = location?.state?.selectedLocation;

    return (
        <div className="p-6 pt-0 max-w-md mx-auto bg-white rounded-xl">
            <div className='flex justify-center w-full'>
                <BackButton
                    onClick={() => {
                        setVehiclePanel(true);
                        setConfirmRide(false);
                        setVehicle({});
                        setRideStatus('confirm');
                        clearTimeout(timeoutRef.current);
                    }}
                />

            </div>
            <h1 className="text-2xl font-bold text-center mb-6">Looking For a Driver</h1>

            <div className="flex flex-col gap-2">

                <div className="flex justify-center">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full max-w-xs rounded-lg shadow-sm"
                    >
                        <source src={waitingForDriverVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-center text-gray-500">
                        Please wait while we find the best driver for you...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LookingForDriver;
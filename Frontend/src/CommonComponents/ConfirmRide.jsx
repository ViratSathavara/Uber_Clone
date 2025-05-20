import React, { useState, useEffect, useRef } from 'react';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { Button } from '@mui/material';
import LookingForDriver from './LookingForDriver';
import DriverProfile from './DriverProfile';
import BackButton from './BackButton';

const ConfirmRide = ({ vehicleData, createRide, setConfirmRide, fullPickup, fullDestination, driverData, setDriverData, setVehiclePanel, setVehicle }) => {
  const [rideStatus, setRideStatus] = useState('confirm');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (driverData?._id) {
      setRideStatus('driver_found');
      clearTimeout(timeoutRef.current);
    }
  }, [driverData]);

  const handleConfirmRide = () => {
    createRide();
    setRideStatus('searching');

    timeoutRef.current = setTimeout(() => {
      if (!driverData?._id) {
        setRideStatus('not_found');
      }
    }, 120000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  switch (rideStatus) {
    case 'searching':
      return (
        <LookingForDriver setRideStatus={setRideStatus} setVehiclePanel={setVehiclePanel} setConfirmRide={setConfirmRide} setVehicle={setVehicle} timeoutRef={timeoutRef} />
      );

    case 'driver_found':
      return (
        <DriverProfile
          driver={driverData}
          vehicle={vehicleData}
          onCancel={() => {
            setRideStatus('confirm');
            setDriverData(null);
            clearTimeout(timeoutRef.current);
          }}
        />
      );

    case 'not_found':
      return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
          <BackButton
            onClick={() => {
              setVehiclePanel(true);
              setConfirmRide(false);
              setVehicle({});
              clearTimeout(timeoutRef.current);
            }}
          />
          <h1 className="text-2xl font-bold mb-4">Driver Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find a driver for your ride.</p>
          <Button
            onClick={() => {
              setRideStatus('confirm');
              clearTimeout(timeoutRef.current);
            }}
            className="!bg-blue-600 !text-white"
          >
            Try Again
          </Button>
        </div>
      );

    default:
      return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Confirm Your Ride</h1>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={vehicleData?.image}
                alt={vehicleData?.name}
                className="w-20 h-20 object-contain"
              />
              <div>
                <h1 className="text-xl font-semibold">{vehicleData?.name}</h1>
                <p className="text-gray-600">{vehicleData?.description}</p>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="p-4 border-b border-gray-200">
              <div className='flex gap-1'>
                <AddLocationIcon className="text-black text-3" />
                <h1 className="text-sm font-medium text-gray-500">Pickup Location</h1>
              </div>
              <h2 className="text-lg font-semibold mt-1">{fullPickup?.structured_formatting?.secondary_text || ''}</h2>
              <h2 className="text-sm text-gray-600 font-semibold mt-1">{fullPickup.description}</h2>
            </div>

            {/* Destination Location */}
            <div className="p-4 border-b border-gray-200">
              <div className='flex gap-1'>
                <WhereToVoteIcon className="text-black text-3" />
                <h1 className="text-sm font-medium text-gray-500">Destination Location</h1>
              </div>
              <h2 className="text-lg font-semibold mt-1">{fullDestination?.structured_formatting?.secondary_text || ''}</h2>
              <h2 className="text-sm text-gray-600 font-semibold mt-1">{fullDestination.description}</h2>
            </div>

            {/* Price */}
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <h1 className="text-lg font-medium">Price</h1>
              <h2 className="text-xl font-bold text-blue-600">{vehicleData?.price}</h2>
            </div>

            <Button
              onClick={handleConfirmRide}
              className="w-full py-3 !bg-green-600 !text-white font-bold rounded-lg hover:!bg-green-700 transition"
            >
              Confirm Ride
            </Button>
          </div>
        </div>
      );
  }
};

export default ConfirmRide;
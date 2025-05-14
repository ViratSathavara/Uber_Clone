import React, { useState } from 'react';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LookingForDriver from './LookingForDriver';
import DriverProfile from './DriverProfile';

const ConfirmRide = ({ selectedLocation, selectedVehicle }) => {
  const navigate = useNavigate();
  const [rideStatus, setRideStatus] = useState('confirm');
  const [driverData, setDriverData] = useState(null);

  const handleConfirmRide = async () => {
    setRideStatus('searching');
    
    try {
      // Simulate API call to find driver (2 second delay for testing)
      const driver = await mockFindDriverAPI();
      
      if (driver) {
        setDriverData({
          id: 'driver123',
          name: 'Rajesh Kumar',
          rating: 4.7,
          carModel: 'Hyundai Creta',
          licensePlate: 'DL5CAB1234',
          eta: '3 min',
          phone: '+919876543210',
          image: 'https://img.freepik.com/free-photo/man-fastening-safety-belt-car_1303-32008.jpg?uid=R56702273&ga=GA1.1.233314606.1746901734&semt=ais_hybrid&w=740',
          totalRides: 245,
          carColor: 'White',
          carYear: 2020
        });
        setRideStatus('driver_found');
      } else {
        setRideStatus('not_found');
      }
    } catch (error) {
      console.error('Error finding driver:', error);
      setRideStatus('not_found');
    }
  };

  // Mock API function that returns driver data after 2 seconds
  const mockFindDriverAPI = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Always resolve with true for testing (driver found)
        resolve(true);
      }, 2000); // 2 second delay
    });
  };

  // Render different screens based on ride status
  switch (rideStatus) {
    case 'searching':
      return (
        <LookingForDriver 
          selectedLocation={selectedLocation} 
          selectedVehicle={selectedVehicle} 
        />
      );
    
    case 'driver_found':
      return (
        <DriverProfile 
          driver={driverData}
          vehicle={selectedVehicle}
          location={selectedLocation}
          onCancel={() => setRideStatus('confirm')}
        />
      );
    
    case 'not_found':
      return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Driver Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find a driver for your ride.</p>
          <Button 
            onClick={() => setRideStatus('confirm')}
            className="!bg-blue-600 !text-white"
          >
            Try Again
          </Button>
        </div>
      );
    
    default: // 'confirm'
      return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Confirm Your Ride</h1>

          <div className="space-y-6">
            {/* Vehicle Details */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={selectedVehicle?.image}
                alt={selectedVehicle?.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1 className="text-xl font-semibold">{selectedVehicle?.name}</h1>
                <p className="text-gray-600">{selectedVehicle?.description}</p>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="p-4 border-b border-gray-200">
              <div className='flex gap-1'>
                <AddLocationIcon className="text-black text-3" />
                <h1 className="text-sm font-medium text-gray-500">Pickup Location</h1>
              </div>
              <h2 className="text-lg font-semibold mt-1">{selectedLocation?.currentLocation}</h2>
              <h3 className="text-gray-600">{selectedLocation?.currentAddress}</h3>
            </div>

            {/* Destination Location */}
            <div className="p-4 border-b border-gray-200">
              <div className='flex gap-1'>
                <WhereToVoteIcon className="text-black text-3" />
                <h1 className="text-sm font-medium text-gray-500">Destination Location</h1>
              </div>
              <h2 className="text-lg font-semibold mt-1">{selectedLocation?.destinationLocation}</h2>
              <h3 className="text-gray-600">{selectedLocation?.destinationAddress}</h3>
            </div>

            {/* Price */}
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <h1 className="text-lg font-medium">Price</h1>
              <h2 className="text-xl font-bold text-blue-600">{selectedVehicle?.price}</h2>
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
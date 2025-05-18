import React from 'react';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Button } from '@mui/material';
import { useNavigation } from '../../UtilityComponents/NavigateUtility';
import LiveTracking from '../../CommonComponents/LiveTracking';
import { useLocation } from 'react-router-dom';

const UserRiding = () => {
    const { navigateTo } = useNavigation();
    const location = useLocation();
    const data = location.state?.ride || {};; 

    console.log('data', data);


  // Mock trip data
  const trip = {
    pickup: "Connaught Place, New Delhi",
    destination: "India Gate, New Delhi",
    distance: "6.5 km",
    duration: "15 min",
    price: "₹245",
    progress: 65 // percentage
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">

        
      {/* Map Section (Top Half) */}
      <div className="h-auto relative">
        <LiveTracking />
        <button 
          onClick={() => navigateTo('HOME')}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
        >
          <HomeOutlinedIcon />
        </button>
      </div>

      {/* Info Section (Bottom Half) */}
      <div className="h-1/2 bg-white p-6 flex flex-col">
        {/* Driver Info */}
        <div className="flex items-center mb-6">
          <div className="relative mr-4">
            <img 
              src={data} 
              alt="Driver" 
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1">
              <DriveEtaIcon fontSize="small" />
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-center">
              {console.log(data)}
              <h2 className="text-xl font-bold">{data.user.fullname.firstname + " " + data.user.fullname.lastname}</h2>
              <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                <StarIcon className="text-yellow-500 mr-1" fontSize="small" />
                {/* <span className="font-semibold">{driver.rating}</span> */}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>
                <p className="font-medium text-gray-700">Plate</p>
                <p>{data.captain.vehicle.plate}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Color</p>
                <p>{data.captain.vehicle.color}</p>
              </div>
            </div>
          </div>
        </div>

        Trip Details
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-3">
            <span className="font-medium">Distance</span>
            <span>{trip.distance}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="font-medium">Duration</span>
            <span>{trip.duration}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-blue-600">{trip.price}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3">
          <Button 
            variant="outlined" 
            // startIcon={<PhoneIcon />}
            className="!border-green-500 !text-green-500 w-1/2 !px-6"
          >
            Call Driver
          </Button>
          <Button 
            variant="contained" 
            className="!bg-green-600 !text-white !px-6 w-1/2"
            onClick={() => navigate('/')}
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserRiding;
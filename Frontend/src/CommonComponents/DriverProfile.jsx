import React from 'react';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import StarIcon from '@mui/icons-material/Star';

const DriverProfile = ({ driver, vehicle }) => {
  const OTPBoxes = ({ otp }) => {
    const digits = otp ? otp.toString().split('') : [];
    
    return (
      <div className="flex justify-center space-x-2">
        {digits.length > 0 ? (
          digits.map((digit, index) => (
            <div 
              key={index}
              className="w-8 h-8 flex items-center justify-center border-2 border-blue-500 rounded-lg text-xl font-bold bg-blue-50"
            >
              {digit}
            </div>
          ))
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <div 
              key={index}
              className="w-12 h-12 border-2 border-gray-300 rounded-lg bg-gray-100"
            />
          ))
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-md h-screen overflow-auto mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Driver Details</h1>

      {/* Driver Profile Section */}
      <div className="flex items-center justify-between p-4 mb-6 bg-gray-50 rounded-lg">
        {/* Driver Avatar */}
        <div className="flex flex-col items-center justify-center gap-3">
          <img
            src={driver?.image || 'https://cdn-icons-png.flaticon.com/512/1535/1535791.png'}
            alt={driver?.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
            <StarIcon className="text-yellow-500 mr-1" />
            <span className="font-semibold">{driver?.rating || '4.8'}</span>
          </div>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <h2 className="text-xl font-bold">
            {driver?.captain?.fullname?.firstname + " " + driver?.captain?.fullname?.lastname}
          </h2>
          <p className="text-sm font-medium text-gray-700">
            <span className="font-normal uppercase">{driver?.captain?.vehicle?.plate || 'ABC-1234'}</span>
          </p>
          
          {/* OTP Section */}
          <div className="mt-2">
            <OTPBoxes otp={driver?.otp} />
          </div>
        </div>
      </div>

      {/* Existing Content */}
      <div className="space-y-6">
        {/* Vehicle Details */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <img
            src={vehicle?.image}
            alt={vehicle?.name}
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-xl font-semibold">{vehicle?.name}</h1>
            <p className="text-gray-600">{vehicle?.description}</p>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="p-4 border-b border-gray-200">
          <div className='flex gap-1'>
            <AddLocationIcon className="text-black text-3" />
            <h1 className="text-sm font-medium text-gray-500">Pickup Location</h1>
          </div>
          <h3 className="text-black">{driver?.fullPickup?.structured_formatting?.main_text}</h3>
          <p className="text-gray-600">{driver?.pickup}</p>
        </div>

        {/* Destination Location */}
        <div className="p-4 border-b border-gray-200">
          <div className='flex gap-1'>
            <WhereToVoteIcon className="text-black text-3" />
            <h1 className="text-sm font-medium text-gray-500">Destination Location</h1>
          </div>
          <h3 className="text-black">{driver?.fullDestination?.structured_formatting?.main_text}</h3>
          <p className="text-gray-600">{driver?.destination}</p>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
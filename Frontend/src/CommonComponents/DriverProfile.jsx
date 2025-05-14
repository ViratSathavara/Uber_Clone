import React from 'react';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import StarIcon from '@mui/icons-material/Star';

const DriverProfile = ({ driver, vehicle, location }) => {
  return (
    <div className="p-6 max-w-md h-screen overflow-auto mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Driver Details</h1>

      {/* Driver Profile Section */}
      <div className="flex items-center justify-between p-4 mb-6 bg-gray-50 rounded-lg">
        {/* Driver Avatar */}
        <div className="flex flex-col items-center justify-center gap-3">
          <img
            src={driver?.image || 'https://via.placeholder.com/80'} // Fallback image
            alt={driver?.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
            <StarIcon className="text-yellow-500 mr-1" />
            <span className="font-semibold">{driver?.rating || '4.8'}</span>
          </div>
        </div>
        <div className='flex flex-col items-end gap-2'>

          <h2 className="text-xl font-bold">{driver?.name || 'Driver Name'}</h2>
          <p className="text-gray-600">{driver?.carModel || 'Car Model'}</p>
          
          <p className="text-sm font-medium text-gray-700">
            <span className="font-normal">{driver?.licensePlate || 'ABC-1234'}</span>
          </p>
          <p className="text-sm font-medium text-gray-700">
            ETA: <span className="font-normal text-green-600">{driver?.eta || '2 min'}</span>
          </p>
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
          <h2 className="text-lg font-semibold mt-1">{location?.currentLocation}</h2>
          <h3 className="text-gray-600">{location?.currentAddress}</h3>
        </div>

        {/* Destination Location */}
        <div className="p-4 border-b border-gray-200">
          <div className='flex gap-1'>
            <WhereToVoteIcon className="text-black text-3" />
            <h1 className="text-sm font-medium text-gray-500">Destination Location</h1>
          </div>
          <h2 className="text-lg font-semibold mt-1">{location?.destinationLocation}</h2>
          <h3 className="text-gray-600">{location?.destinationAddress}</h3>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
          <h1 className="text-lg font-medium">Price</h1>
          <h2 className="text-xl font-bold text-blue-600">{vehicle?.price}</h2>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
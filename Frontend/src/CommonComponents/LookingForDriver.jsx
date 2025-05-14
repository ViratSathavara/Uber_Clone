import React from 'react';
import waitingForDriverVideo from '../assets/waitingfordriver.mp4';
import { useLocation } from 'react-router-dom';

const LookingForDriver = ({ selectedLocation, selectedVehicle }) => {
    // const location = useLocation();
    // const selectedVehicle = location?.state?.selectedVehicle;
    // const selectedLocation = location?.state?.selectedLocation;
    
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl">
            <h1 className="text-2xl font-bold text-center mb-6">Looking For a Driver</h1>

            <div className="flex flex-col gap-2">
                {selectedVehicle && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img
                            src={selectedVehicle.image}
                            alt={selectedVehicle.name}
                            className="w-16 h-16 object-contain"
                        />
                        <div className="min-w-0"> {/* Add min-w-0 to allow truncation in flex child */}
                            <h1 className="text-xl font-semibold truncate">{selectedVehicle.name}</h1>
                            <p className="text-gray-600 line-clamp-1"> {/* Show max 2 lines */}
                                {selectedVehicle.description}
                            </p>
                        </div>
                    </div>
                )}

                {selectedLocation && (
                    <>
                        <div className="p-4 border-1 rounded-lg border-gray-300">
                            <div className='flex gap-1'>
                                <h1 className="text-sm font-medium text-gray-500">Pickup Location</h1>
                            </div>
                            <h2 className="text-lg font-semibold mt-1 truncate">
                                {selectedLocation.currentLocation}
                            </h2>
                            <h3 className="text-gray-600 line-clamp-1">
                                {selectedLocation.currentAddress}
                            </h3>
                        </div>
                        <div className="p-4 border-1 rounded-lg border-gray-300">
                            <div className='flex gap-1'>
                                <h1 className="text-sm font-medium text-gray-500">Drop Location</h1>
                            </div>
                            <h2 className="text-lg font-semibold mt-1 truncate">
                                {selectedLocation.destinationLocation}
                            </h2>
                            <h3 className="text-gray-600 line-clamp-1">
                                {selectedLocation.destinationAddress}
                            </h3>
                        </div>
                    </>
                )}

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
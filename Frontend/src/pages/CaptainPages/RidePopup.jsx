import { Button } from '@mui/material'
import React from 'react'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';

const RidePopup = ({ confirmRide={confirmRide}, ride, setOpenPopup, setConfirmRidePopup }) => {
    console.log('ride', ride);
    return (
        <div>
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-2">New Ride Available!</h1>
                <div className="flex items-center justify-between w-full">
                    <img
                        src="https://img.freepik.com/free-photo/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg?uid=R56702273&ga=GA1.1.233314606.1746901734&semt=ais_hybrid&w=740"
                        alt="User"
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div className='flex items-end flex-col'>
                        <h2 className='text-2xl font-bold'>{ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.firstname}</h2>
                        <p>2.4 km</p>
                    </div>
                </div>
                <div className="p-4 border-b border-gray-200">
                    <div className='flex gap-1'>
                        <AddLocationIcon className="text-black text-3" />
                        <h1 className="text-sm font-medium text-gray-500">Pickup Location</h1>
                    </div>
                    <h3 className="text-black">{ride?.fullPickup?.structured_formatting?.main_text}</h3>
                    <p className="text-gray-600">{ride?.pickup}</p>
                </div>

                <div className="p-4 border-b border-gray-200">
                    <div className='flex gap-1'>
                        <WhereToVoteIcon className="text-black text-3" />
                        <h1 className="text-sm font-medium text-gray-500">Destination Location</h1>
                    </div>
                    <h3 className="text-gray-600">{ride?.fullDestination?.structured_formatting?.main_text}</h3>
                    <p className="text-gray-600">{ride?.destination}</p>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center p-4 rounded-lg">
                    <h1 className="text-lg font-medium">Price</h1>
                    <h2 className="text-lg font-semibold">₹{ride?.fare}</h2>
                </div>
                <div className='flex flex-row gap-3'>
                    <Button
                          onClick={() => {
                            confirmRide()
                            setConfirmRidePopup(true)}}
                        className="!capitalize w-full py-3 !bg-yellow-400 !text-black font-bold rounded-lg hover:!bg-green-700 transition"
                    >
                        Accept
                    </Button>
                    <Button
                          onClick={() => setOpenPopup(false)}
                        className="!capitalize w-full py-3 !bg-gray-200 !text-gray-800 font-bold rounded-lg hover:!bg-green-700"
                    >
                        Ignore
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RidePopup
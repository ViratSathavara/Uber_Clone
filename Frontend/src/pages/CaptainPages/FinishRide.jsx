import React from 'react'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';

const FinishRide = () => {
  return (
     <div>
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
                <h1 className="text-2xl font-bold text-center mb-2">Finish Ride</h1>
                <div className="flex items-center justify-between w-full">
                    <img
                        src="https://img.freepik.com/free-photo/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg?uid=R56702273&ga=GA1.1.233314606.1746901734&semt=ais_hybrid&w=740"
                        alt="User"
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div className='flex items-end flex-col'>
                        <h2 className='text-2xl font-bold'>Maria Oka</h2>
                        <p>2.4 km</p>
                    </div>
                </div>
                <div className="p-4 border-b border-gray-200">
                    <div className='flex gap-1'>
                        <AddLocationIcon className="text-black text-3" />
                        <h1 className="text-sm font-medium text-gray-500">Pickup Location</h1>
                    </div>
                    <h2 className="text-lg font-semibold mt-1">Padmavati Parking</h2>
                    <h3 className="text-gray-600">Near Padmavati Temple, Satara Road, Pune</h3>
                </div>

                <div className="p-4 border-b border-gray-200">
                    <div className='flex gap-1'>
                        <WhereToVoteIcon className="text-black text-3" />
                        <h1 className="text-sm font-medium text-gray-500">Destination Location</h1>
                    </div>
                    <h2 className="text-lg font-semibold mt-1">20 Tathastu Homes</h2>
                    <h3 className="text-gray-600">bankar colony, hadapsar, Hydrabad road, Pune</h3>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center p-4 rounded-lg">
                    <h1 className="text-lg font-medium">Price</h1>
                    <h2 className="text-lg font-semibold">₹250.29 Cash</h2>
                </div>
            </div>
        </div>
  )
}

export default FinishRide
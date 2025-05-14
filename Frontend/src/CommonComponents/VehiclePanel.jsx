import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

const VehiclePanel = ({ setVehiclePanel, setConfirmRide, setSelectedVehicle }) => {
    const vehicles = [
        {
            id: 1,
            name: 'Car',
            image: 'https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png',
            capacity: 4,
            timeAway: '2 min away',
            arrivalTime: '12:00',
            description: 'Affordable, Correct Ride',
            price: '₹ 200'
        },
        {
            id: 2,
            name: 'Bike',
            image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
            capacity: 1,
            timeAway: '12 min away',
            arrivalTime: '12:12',
            description: 'Affordable, Correct Ride',
            price: '₹ 100'
        },
        {
            id: 3,
            name: 'Auto',
            image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
            capacity: 3,
            timeAway: '30 min away',
            arrivalTime: '12:30',
            description: 'Costly',
            price: '₹ 170'
        }
    ];

    return (
        <div>
            <p className='text-2xl font-bold'>Choose a Vehicle</p>
            {vehicles.map((vehicle) => (
                <div 
                    key={vehicle.id} 
                    className='flex flex-row p-1 items-center pb-5 rounded-xl active:border-2 active:border-black'
                    onClick={() => {
                        setVehiclePanel(false);
                        setConfirmRide(true);
                        setSelectedVehicle(vehicle);
                    }}
                >
                    <div className='w-[35%]'>
                        <img src={vehicle.image} className='w-auto h-20' alt={vehicle.name} />
                    </div>
                    <div className='w-[45%]'>
                        <div className='flex flex-row items-center gap-2'>
                            <h1 className='text-2xl font-bold text-black'>{vehicle.name}</h1>
                            <div className='flex'>
                                <PersonIcon className='text-5' />
                                <h2>{vehicle.capacity}</h2>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <h3 className='text-sm font-semibold'>{vehicle.timeAway}</h3>
                            <h3 className='text-sm font-semibold'>{vehicle.arrivalTime}</h3>
                        </div>
                        <p className='text-sm'>{vehicle.description}</p>
                    </div>
                    <div className='h-full w-[20%]'>
                        <p className='text-xl font-bold'>{vehicle.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VehiclePanel;
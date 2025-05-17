import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

const VehiclePanel = ({ setVehicle, fare, setVehiclePanel, setConfirmRide }) => {
    const vehicles = [
        {
            id: 1,
            name: 'Car',
            type: 'car',
            image: 'https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png',
            capacity: 4,
            description: 'Affordable, Correct Ride',
            price: `₹ ${fare?.car}`
        },
        {
            id: 2,
            name: 'Bike',
            type: 'bike',
            image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
            capacity: 1,
            description: 'Affordable, Correct Ride',
            price: `₹ ${fare?.bike}`
        },
        {
            id: 3,
            name: 'Auto',
            type: 'auto',
            image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
            capacity: 3,
            description: 'Costly',
            price: `₹ ${fare?.auto}`
        }
    ];

    const vehicleSelected = (vehicle) => {
        setVehicle(vehicle);
        setVehiclePanel(false);
        setConfirmRide(true);
    }

    return (
        <div>
            <p className='text-2xl font-bold'>Choose a Vehicle</p>
            {vehicles.map((vehicle) => (
                <div
                    key={vehicle.id}
                    className='flex flex-row p-1 items-center pb-5 rounded-xl active:border-2 active:border-black'
                    onClick={() => vehicleSelected(vehicle)}
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
                        <p className='text-sm'>{vehicle.description}</p>
                    </div>
                    <div className='h-full w-[25%]'>
                        <p className='text-lg  font-bold'>{vehicle.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VehiclePanel;
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

const VehiclePanel = () => {
    return (
        <div>
            <p className='text-2xl font-bold'>Choose a Vehicle</p>
            <div className='flex flex-row p-1 items-center pb-5 rounded-xl active:border-2 active:border-black'>
                <div className='w-[35%]'>
                    <img src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" className='w-auto h-20' alt="" />
                </div>
                <div className='w-[45%]'>
                    <div className='flex flex-row items-center gap-2'>
                        <h1 className='text-2xl font-bold text-black'>Car</h1>
                        <div className='flex'>
                            <PersonIcon className='text-5' />
                            <h2>4</h2>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <h3 className='text-sm font-semibold'>2 min away</h3>
                        <h3 className='text-sm font-semibold'> 12:00 </h3>
                    </div>
                    <p className='text-sm'>Affortable, Corrct Ride</p>
                </div>
                <div className='h-full w-[20%]'>
                    <p className='text-xl font-bold'>₹ 200</p>
                </div>
            </div>
            <div className='flex flex-row p-1 items-center pb-5 rounded-xl active:border-2 active:border-black'>
                <div className='w-[35%]'>
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" className='w-auto h-20' alt="" />
                </div>
                <div className='w-[45%]'>
                    <div className='flex flex-row items-center gap-2'>
                        <h1 className='text-2xl font-bold text-black'>Bike</h1>
                        <div className='flex'>
                            <PersonIcon className='text-5' />
                            <h2>1</h2>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <h3 className='text-sm font-semibold'>12 min away</h3>
                        <h3 className='text-sm font-semibold'> 12:12 </h3>
                    </div>
                    <p className='text-sm'>Affortable, Corrct Ride</p>
                </div>
                <div className='h-full w-[20%]'>
                    <p className='text-xl font-bold'>₹ 100</p>
                </div>
            </div>
            <div className='flex flex-row p-1 items-center pb-5 rounded-xl active:border-2 active:border-black'>
                <div className='w-[35%]'>
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" className='w-auto h-20' alt="" />
                </div>
                <div className='w-[45%]'>
                    <div className='flex flex-row items-center gap-2'>
                        <h1 className='text-2xl font-bold text-black'>Auto</h1>
                        <div className='flex'>
                            <PersonIcon className='text-5' />
                            <h2>3</h2>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <h3 className='text-sm font-semibold'>30 min away</h3>
                        <h3 className='text-sm font-semibold'> 12:30 </h3>
                    </div>
                    <p className='text-sm'>Costly</p>
                </div>
                <div className='h-full w-[20%]'>
                    <p className='text-xl font-bold'>₹ 170</p>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel
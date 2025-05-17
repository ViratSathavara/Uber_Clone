import React, { useContext } from 'react'
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import StarIcon from '@mui/icons-material/Star';
import { UserDataContext } from '../../context/UserContext'
import { Button } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import {CaptainDataContext} from '../../context/CaptainContext'

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);
    
    const driver = {
        name: "Rajesh Kumar",
        rating: 4.8,
        carModel: "Hyundai Creta",
        licensePlate: "DL 05 AB 1234",
        eta: "3 min",
        phone: "+91 98765 43210",
        image: "https://img.freepik.com/free-photo/man-fastening-safety-belt-car_1303-32008.jpg?uid=R56702273&ga=GA1.1.233314606.1746901734&semt=ais_hybrid&w=740",
        totalRides: 4,
        carColor: "White"
    };

    console.log(captain)
    return (
        <>
            <div className='flex flex-col gap-1 p-4 mt-3 rounded-lg items-center'>
                <div className="relative">
                    <img
                        src={driver.image}
                        alt="Driver"
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                        <DriveEtaIcon fontSize="small" />
                    </div>
                </div>
            </div>
            <div className='flex p-4 m-3 bg-gray-200 rounded-lg items-center'>
                <div className=" flex items-center w-full ">

                    <div className="flex-grow mt-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{captain?.fullname?.firstname} {captain?.fullname?.lastname}</h2>
                            <div className="flex items-end flex-col">
                                <p>Total Earned</p>
                                <p className='text-xl font-bold'>₹245</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-around gap-1 p-4 m-3 rounded-lg bg-gray-200 items-center'>
                <div className='flex flex-col items-center gap-2'>
                    <AccessTimeOutlinedIcon className='font-bold' fontSize="large" />
                    <h1 className='font-bold text-2xl'>10.3</h1>
                    <h1 className='text-xs'>HOURS ONLINE</h1>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <SpeedOutlinedIcon className='font-bold' fontSize="large" />
                    <h1 className='font-bold text-2xl'>30K</h1>
                    <h1 className='text-xs'>TOTAL DISTANCE</h1>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <DescriptionOutlinedIcon className='font-bold' fontSize="large" />
                    <p className='font-bold text-2xl'>10.3</p>
                    <h1 className='text-xs'>HOURS ONLINE</h1>
                </div>
            </div>
        </>
    )
}

export default CaptainDetails
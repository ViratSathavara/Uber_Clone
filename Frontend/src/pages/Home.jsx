import React, { useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Button, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationSearchPanel from '../CommonComponents/LocationSearchPanel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VehiclePanel from '../CommonComponents/VehiclePanel';
import ConfirmRide from '../CommonComponents/ConfirmRide';
import LookingForDriver from '../CommonComponents/LookingForDriver';

const Home = () => {
  const { user } = React.useContext(UserDataContext);
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState({})
  const [confirmRide, setConfirmRide] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState({})
  const navigate = useNavigate();
  const token = localStorage.getItem('token')

  return (
    <div className='h-screen relative overflow-hidden'>
      {/* <h1>
      Welcome <b>User</b> {user?.data?.user?.fullname?.firstname} {user?.data?.user?.fullname?.lastname}
    </h1> */}
      <img
        src="../assets/Uber-Logo.png"
        alt="uber-logo"
        className="top-4 left-4 w-24 absolute"
      />

      <div className='w-screen'>
        <img className='w-full h-screen object-cover' src="https://cdn.dribbble.com/users/844221/screenshots/4539927/attachments/1027442/uber-search-2.png?resize=400x300&vertical=center" alt="image" />
      </div>
      <div className='absolute flex flex-col justify-end h-auto bottom-0 transform w-full'>
        <div className='p-5 h-[30%] bg-white'>
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold text-black'>Welcome to Uber</h1>
            {
              panelOpen
              && (

                <Button onClick={() => setPanelOpen(false)}>
                  <KeyboardArrowDownIcon className='text-black' />
                </Button>
              )
            }
          </div>
          <div className='flex flex-col gap-4 mt-5 relative'>
            <div className='absolute w-1 h-20 bg-gray-700 z-10 left-4.5 top-6.5'></div>
            <TextField
              id="email"
              type="email"
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Add a pick-up location"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                className: "rounded-lg pl-7 bg-gray-50",
              }}
              InputLabelProps={{
                className: "text-gray-500",
              }}
            />
            <TextField
              id="email"
              type="email"
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                className: "rounded-lg pl-7 bg-gray-50",
              }}
              InputLabelProps={{
                className: "text-gray-500",
              }}
            />
          </div>
        </div>
        <div className='w-full bg-black h-0.5'></div>
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${panelOpen ? 'max-h-[70vh]' : 'max-h-0'} bg-white`}
        >
          <LocationSearchPanel setSelectedLocation={setSelectedLocation} setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen} />
        </div>

      </div>
      <div className={`p-3 flex flex-col gap-3 fixed left-0 w-full bg-white shadow-lg transition-all duration-[1000ms] z-50 ${vehiclePanel ? 'translate-y-0' : 'translate-y-full'} bottom-0`}>
        <Button onClick={() => {
          setVehiclePanel(false)
          setPanelOpen(true)
        }}
          className='absolute text-center'
        >
          <ExpandMoreIcon className=' text-black' />
        </Button>
        <VehiclePanel setSelectedVehicle={setSelectedVehicle} setVehiclePanel={setVehiclePanel} setConfirmRide={setConfirmRide} />
      </div>
      <div className={`p-3 flex flex-col gap-3 fixed left-0 w-full bg-white shadow-lg transition-all duration-[1000ms] z-50 ${confirmRide ? 'translate-y-0' : 'translate-y-full'} bottom-0`}>
        <ConfirmRide selectedVehicle={selectedVehicle} selectedLocation={selectedLocation} />
      </div>
    </div>
  )
}

export default Home
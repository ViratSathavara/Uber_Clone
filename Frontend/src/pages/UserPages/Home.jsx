import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { UserDataContext } from '../../context/UserContext';
import LocationSearchPanel from '../../CommonComponents/LocationSearchPanel';
import VehiclePanel from '../../CommonComponents/VehiclePanel';
import ConfirmRide from '../../CommonComponents/ConfirmRide';
import BackButton from '../../CommonComponents/BackButton';
import { SocketProvider, useSocket } from '../../context/SocketContext';
import { useCallback } from 'react';
import { useNavigation } from '../../UtilityComponents/NavigateUtility';
import LiveTracking from '../../CommonComponents/LiveTracking';

const Home = () => {
  const { navigateTo } = useNavigation();
  const { user } = useContext(UserDataContext);
  const [pickup, setPickup] = useState('');
  const [fullPickup, setFullPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [fullDestination, setFullDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const token = localStorage.getItem('user_token')
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [vehicle, setVehicle] = useState({});
  console.log(vehicle)
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const { socket, sendMessage, receiveMessage } = useSocket();
  const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    sendMessage('join', {
      userId: user?._id,
      userType: 'user',
    })
  }, []);



  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField('pickup');

    if (value.trim().length === 0) {
      setPickupSuggestions([]);
      return;
    }

    try {
      const token = localStorage.getItem('user_token');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('user_token');
        throw new Error('Token has expired');
      }

      const res = await axios.get(`${import.meta.env.VITE_BASE_HOSTED_URI}/maps/get-suggestions`, {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000
      });

      if (res.data && Array.isArray(res.data)) {
        setPickupSuggestions(res.data);
      } else {
        console.error('Unexpected response format:', res.data);
        setPickupSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching pickup suggestions:', error);

      if (error.response?.status === 401) {
        localStorage.removeItem('user_token');
      }

      setPickupSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField('destination');

    if (value.trim().length > 0) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_HOSTED_URI}/maps/get-suggestions`, {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDestinationSuggestions(res.data || []);
      } catch (error) {
        console.error('Error fetching destination suggestions:', error);
        setDestinationSuggestions([]);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description);
      setFullPickup(suggestion);
    } else {
      setDestination(suggestion.description);
      setFullDestination(suggestion);
    }
  };


  const createRide = useCallback(async () => {
    try {
      if (!pickup || !destination) {
        throw new Error('Pickup, destination, and vehicle type are required');
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_HOSTED_URI}/ride/create`,
        {
          pickup,
          destination,
          fullPickup,
          fullDestination,
          vehicleType: vehicle?.type
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`,
            'Content-Type': 'application/json'
          }
        }
      );


      if (res.status === 201) {
        setVehicle(prev => ({ ...prev, ...res.data }));

      } else {
        throw new Error(`Unexpected status code: ${res.status}`);
      }
    } catch (error) {
      console.error('Error creating ride:', error);
      throw error;
    }
  }, [vehicle]);

  socket.on('ride-confirmed', (data) => {
    setDriverData(data?.ride);
    setConfirmRide(true);
    setVehiclePanel(false);
    setPanelOpen(false);
  });

  socket.on('ride-started', (data) => {

    navigateTo('RIDING', data )
  })

  socket.on('ride-ended', (data) => {
    console.log(data)
    navigateTo('HOME')
  })
  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        src="../assets/Uber-Logo.png"
        alt="uber-logo"
        className="top-4 left-4 w-24 absolute"
      />
      <div className='w-screen h-full'>
        <LiveTracking />
        <button
          onClick={() => {
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_data');
            window.location.href = '/login';
          }}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
        >
          <LogoutOutlinedIcon />
        </button>
      </div>

      <div className='absolute flex flex-col justify-end h-auto bottom-0 w-full'>
        <div className={`p-5 max-h-screen  relative bg-white`}>
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold text-black'>Welcome to Uber</h1>
              <Button onClick={() => setPanelOpen(false)}>
                <KeyboardArrowDownIcon className='text-black' />
              </Button>
          </div>
          <div className='absolute right-2 text-blue-500'>
            <Button className='!capitalize' onClick={
              () => {
                setPickup('');
                setDestination('');
                setPanelOpen(false);
              }
            }>clear</Button>
          </div>
          <div className='flex flex-col gap-4 mt-8 relative'>
            <div className='absolute w-1 h-20 bg-gray-700 z-10 left-4.5 top-6.5'></div>
            <TextField
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              value={pickup}
              onChange={handlePickupChange}
              placeholder="Add a pick-up location"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                className: "rounded-lg pl-7 bg-gray-50",
              }}
            />
            <TextField
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Enter your destination"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                className: "rounded-lg pl-7 bg-gray-50",
              }}
            />
          </div>
        

        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${panelOpen ? 'max-h-[70vh]' : 'max-h-0'
            } bg-white`}
        >
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            onSelectSuggestion={handleSelectSuggestion}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            fare={fare}
            setFare={setFare}
            pickup={pickup}
            destination={destination}
          />
        </div>
        </div>
      </div>

      <div
        className={`p-3 flex flex-col gap-3 fixed left-0 w-full bg-white shadow-lg transition-all duration-[1000ms] z-50 ${vehiclePanel ? 'translate-y-0' : 'translate-y-full'
          } bottom-0`}
      >
        <BackButton
          onClick={() => {
            setVehiclePanel(false);
            setPanelOpen(true);
          }}
        />
        <VehiclePanel setVehicle={setVehicle} fare={fare} setVehiclePanel={setVehiclePanel} setConfirmRide={setConfirmRide} />
      </div>

      <div
        className={`p-3 flex flex-col gap-3 max-h-screen overflow-scroll fixed left-0 w-full bg-white shadow-lg  z-50 ${confirmRide ? 'translate-y-0' : 'translate-y-full'
          } bottom-0`}
      >
        
        <ConfirmRide createRide={createRide}
        setVehiclePanel={setVehiclePanel}
        setVehicle={setVehicle}
          setConfirmRide={setConfirmRide}
          vehicleData={vehicle}
          setDriverData={setDriverData}
          driverData={driverData}
          fullDestination={fullDestination}
          fullPickup={fullPickup}
        />
      </div>
    </div>
  );
};

export default Home;
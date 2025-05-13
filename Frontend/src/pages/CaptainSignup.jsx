import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { showSuccessToast, showErrorToast } from '../CommonComponents/Toast';
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('')
  const [plate, setPlate] = useState('')
  const [capacity, setCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  
    const { captain, setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color,
        plate: plate,
        capacity: parseInt(capacity),
        vehicleType
      }
    };

    try {

      console.log('newCaptain', newCaptain)
      const response = await axios.post(`http://localhost:4000/captain/register`, newCaptain);
      console.log('response', response)
      
      if (response?.status === 201) {
        showSuccessToast('Captain Account Created Successfully...');
        const captainData = response?.data;
         setCaptain(captainData)
         console.log(captainData?.captain)
        localStorage.setItem('token', captainData?.token);
        localStorage.setItem('captain', JSON.stringify(captainData?.captain));
        setTimeout(() => navigate('/captain-home', { state: { role: 'captain' } }), 1500);

      }

      // Reset form
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setColor('');
      setPlate('');
      setCapacity('');
      setVehicleType('');
      
    } catch (error) {
      console.error('Signup error:', error);
      console.log(JSON.parse(error?.request?.response).errors[0])
      showErrorToast(JSON.parse(error?.request?.response).errors[0]?.msg);
    }
  };

  return (
    <>
      <img
        src="../assets/Uber-Logo.png"
        alt="uber-logo"
        className="w-24 absolute"
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full max-h-[550px] overflow-auto max-w-md p-8 space-y-6 bg-gray-200 rounded-lg shadow-md"
        >
          <div className="flex flex-col justify-center items-center w-full space-y-4">

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your Fullname
              </label>
              <div className="flex flex-col gap-5">
                <TextField
                  id="firstname"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Firstname"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    className: "rounded-lg bg-gray-50",
                  }}
                  InputLabelProps={{
                    className: "text-gray-500",
                  }}
                />
                <TextField
                  id="lastname"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Lastname"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    className: "rounded-lg bg-gray-50",
                  }}
                  InputLabelProps={{
                    className: "text-gray-500",
                  }}
                />
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your Email
              </label>
              <TextField
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  className: "rounded-lg bg-gray-50",
                }}
                InputLabelProps={{
                  className: "text-gray-500",
                }}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Choose Vehicle Color
              </label>
              <input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-32 h-10 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="plate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter Vehicle Plate Number
              </label>
              <TextField
                id="plate"
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                placeholder="plate"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  className: "rounded-lg bg-gray-50",
                }}
                InputLabelProps={{
                  className: "text-gray-500",
                }}
              />
            </div>

            <div className="w-full">
  <label
    htmlFor="capacity"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Select Vehicle Capacity
  </label>
  <FormControl fullWidth variant="outlined">
    <Select
      id="capacity"
      value={capacity}
      onChange={(e) => setCapacity(e.target.value)}
      displayEmpty
      required
      className="rounded-lg bg-gray-50"
    >
      <MenuItem value="" disabled>Select Capacity</MenuItem>
      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
        <MenuItem key={num} value={num}>
          {num}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</div>

<div className="w-full">
  <label
    htmlFor="vehicleType"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Select Vehicle Type
  </label>
  <FormControl fullWidth variant="outlined">
    <Select
      id="vehicleType"
      value={vehicleType}
      onChange={(e) => setVehicleType(e.target.value)}
      displayEmpty
      required
      className="rounded-lg bg-gray-50"
    >
      <MenuItem value="" disabled>Select Vehicle Type</MenuItem>
      {["Car", "Bike", "Auto"].map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</div>

            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter your Password
              </label>
              <TextField
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                variant="outlined"
                required
                fullWidth
                InputProps={{
                  className: "rounded-lg bg-gray-50",
                }}
              />
            </div>

            <div className="w-full pt-4">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="!py-3 !bg-black hover:bg-gray-900 text-white font-medium rounded-lg shadow-sm transition-colors duration-300"
              >
                Sign Up as Captain
              </Button>
            </div>

            <div className="text-center flex gap-1 text-sm text-gray-600 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Already have a captain account?
              </label>
              <Link
                  to="/captainlogin"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CaptainSignup;

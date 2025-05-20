import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../../CommonComponents/Toast';
import { useCaptainAuth } from '../../CustomHooks/useAuth';
import AuthService from "../../services/AuthService";
import Loader from "../../CommonComponents/Loader";

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    color: '#000000',
    plate: '',
    capacity: '',
    vehicleType: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useCaptainAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newCaptain = {
      fullname: {
        firstname: formData.firstName,
        lastname: formData.lastName,
      },
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.color,
        plate: formData.plate,
        capacity: parseInt(formData.capacity),
        vehicleType: formData.vehicleType
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_HOSTED_URI}/captain/register`, newCaptain);

      if (response?.status === 201) {
        showSuccessToast('Captain Account Created Successfully...');
        console.log(response)
        const { token, captain } = response?.data;
        AuthService.setCaptainAuth(token, captain);
        navigate('/captain-home');
      }

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        color: '#000000',
        plate: '',
        capacity: '',
        vehicleType: ''
      });

    } catch (error) {
      console.error('Signup error:', error);
      const errorMsg = error.response?.data?.message;
      showErrorToast(error?.response?.data?.error);
    }
    finally {
      setIsLoading(false); // Stop loading in any case
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
          onSubmit={handleSubmit}
          className="w-full max-h-[550px] overflow-auto max-w-md p-8 space-y-6 bg-gray-200 rounded-lg shadow-md"
        >
          <div className="flex flex-col justify-center items-center w-full space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your Fullname
              </label>
              <div className="flex flex-col gap-5">
                <TextField
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Firstname"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{ className: "rounded-lg bg-gray-50" }}
                />
                <TextField
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Lastname"
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{ className: "rounded-lg bg-gray-50" }}
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your Mobile No.
              </label>
              <TextField
                name="mobile"
                type="number"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="1234567890"
                variant="outlined"
                required
                fullWidth
                InputProps={{ className: "rounded-lg bg-gray-50" }}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your Email
              </label>
              <TextField
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                variant="outlined"
                required
                fullWidth
                InputProps={{ className: "rounded-lg bg-gray-50" }}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose Vehicle Color
              </label>
              <input
                name="color"
                type="color"
                value={formData.color}
                onChange={handleChange}
                className="w-32 h-10 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Vehicle Plate Number
              </label>
              <TextField
                name="plate"
                type="text"
                value={formData.plate}
                onChange={handleChange}
                placeholder="Plate number"
                variant="outlined"
                required
                fullWidth
                InputProps={{ className: "rounded-lg bg-gray-50" }}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Vehicle Capacity
              </label>
              <FormControl fullWidth variant="outlined">
                <Select
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  displayEmpty
                  required
                  className="rounded-lg bg-gray-50"
                >
                  <MenuItem value="" disabled>Select Capacity</MenuItem>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Vehicle Type
              </label>
              <FormControl fullWidth variant="outlined">
                <Select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  displayEmpty
                  required
                  className="rounded-lg bg-gray-50"
                >
                  <MenuItem value="" disabled>Select Vehicle Type</MenuItem>
                  {['UberGo', 'auto', 'bike', 'UberXL'].map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter your Password
              </label>
              <TextField
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                variant="outlined"
                required
                fullWidth
                InputProps={{ className: "rounded-lg bg-gray-50" }}
              />
            </div>

            <div className="w-full pt-4">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="!py-3 !bg-black hover:bg-gray-900 text-white font-medium rounded-lg shadow-sm transition-colors duration-300"
              >
                {isLoading ? <Loader /> : "Sign Up"}
              </Button>
            </div>

            <div className="text-center flex gap-1 text-sm text-gray-600 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Already have a captain account?
              </label>
              <Link to="/captainlogin" className="text-blue-600 hover:text-blue-800">
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
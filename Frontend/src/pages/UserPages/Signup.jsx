import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../../CommonComponents/Toast';
import { useUserAuth } from '../../CustomHooks/useAuth';
import AuthService from "../../services/AuthService";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { setAuth } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: formData.firstName,
        lastname: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_HOSTED_URI}/users/register`, newUser);
      
      if (response?.status === 201) {
        showSuccessToast('User Created Successfully...');
        const { token, user } = response.data.data;
        AuthService.setUserAuth(token, user);
        navigate('/home');
      }
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      showErrorToast(error?.response?.data?.error);
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
                Sign Up
              </Button>
            </div>

            <div className="text-center flex gap-1 text-sm text-gray-600 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Already have an account?
              </label>
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
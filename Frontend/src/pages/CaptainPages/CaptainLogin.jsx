import { TextField, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginTypeToggle from "../UserPages/LoginTypeToggle";
import { CaptainDataContext } from "../../context/CaptainContext";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../CommonComponents/Toast";
import AuthService from "../../services/AuthService";

const CaptainLogin = () => {
  const [loginType, setLoginType] = useState("captain");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newcaptain = {
      email,
      password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_HOSTED_URI}/captain/login`, newcaptain);

      if (response.status === 200) {
        showSuccessToast('Captain Login Successfully...');
        setCaptain(response?.data?.data?.captain)
        const { token, captain } = response.data.data;
        AuthService.setCaptainAuth(token, captain);
        navigate('/captain-home');

      }

      // Reset form
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Signup error:', error);
      showErrorToast(error);
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
            <LoginTypeToggle loginType={loginType} setLoginType={setLoginType} />

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                What is your Email?
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

            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                What is your Password?
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
                Sign In
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Don't have an account?
              </label>
              <div className="space-x-2">
                <Link
                  to="/captainsignup"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign up as Captain
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CaptainLogin;
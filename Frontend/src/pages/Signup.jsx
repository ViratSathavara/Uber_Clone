import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginTypeToggle from "./LoginTypeToggle";

const Signup = () => {
  const [userData, setUserData] = useState({}); 
  const [firstname, setFirstname] = useState(''); 
  const [lastname, setLastname] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    })
    console.log(firstname, lastname, email, password)
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
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
          className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
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
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
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
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
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
                Sign In
              </Button>
            </div>

            <div className="text-center flex gap-1 text-sm text-gray-600 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Do you have an account?
              </label>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Signin
                </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;

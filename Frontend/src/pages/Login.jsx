import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginTypeToggle from "./LoginTypeToggle";

const Login = () => {
  const [loginType, setLoginType] = useState("user");
  const [userData, setUserData] = useState({}); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      email: email, password: password
    })
    setEmail('');
    setPassword('');
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
            <LoginTypeToggle
              loginType={loginType}
              setLoginType={setLoginType}
            />

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
                  to="/signup"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign up as User
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

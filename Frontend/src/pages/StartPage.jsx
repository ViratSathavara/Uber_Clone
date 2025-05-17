import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div>
      <div className="bg-cover bg-[url(https://images.unsplash.com/photo-1637044875391-d3e7efc44596?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen flex flex-col justify-between bg-red-300">

        <img src="../assets/Uber-Logo.png" alt="uber-logo" className="w-36" />
        
        <div className="items-center bg-white flex gap-10 flex-col justify-center p-14">
          <h3 className="text-2xl font-medium">Get Started With Uber</h3>
          <Button variant="contained" className="w-full !border-0 !bg-black !text-white">
          <Link to='/login'>Continue</Link>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;

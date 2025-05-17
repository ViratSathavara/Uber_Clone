import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './pages/Routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Routes>
        {Object.values(ROUTES).map((route, index) => (
          <Route 
            key={index} 
            path={route.path} 
            element={route.element} 
          />
        ))}
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
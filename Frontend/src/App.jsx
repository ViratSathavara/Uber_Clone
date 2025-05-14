// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './pages/Routes';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <Routes>
        {Object.values(ROUTES).map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
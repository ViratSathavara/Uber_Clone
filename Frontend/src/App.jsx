import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StartPage from './pages/StartPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import CaptainHome from './pages/CaptainHome'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/captainlogin' element={<CaptainLogin />} />
        <Route path='/captainsignup' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectWrapper><Home /> </UserProtectWrapper>} />
          <Route path='/captain-home' element={
          <UserProtectWrapper><CaptainHome /> </UserProtectWrapper>} />
      <Route path='/logout' element={
        <UserProtectWrapper><UserLogout /> </UserProtectWrapper>} />
        <Route path='/logout' element={
        <CaptainProtectWrapper><CaptainLogout /> </CaptainProtectWrapper>} />
        </Routes>
      <ToastContainer />
    </div>
  )
}

export default App

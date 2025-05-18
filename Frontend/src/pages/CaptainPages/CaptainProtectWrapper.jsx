import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({children}) => {

  const [loading, setLoading] = useState(true);
  const {captain, setCaptain} = useContext(CaptainDataContext)
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {

    if (!token) {
      navigate('/login');
    }

    axios.get(`${import.meta.env.VITE_BASE_HOSTED_URI}/captain/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response?.status === 200) {
        setCaptain(response?.data?.captain)
        setLoading(false);
      }
    }).catch((error) => {
      localStorage.removeItem('token')
      localStorage.removeItem('captain')
      navigate('/captainlogin')
    })
  }, [token])

if (loading) {
  return (
    <div>Loading...</div>
  )
}

  return (
    <div>{children}</div>
  )
}

export default CaptainProtectWrapper
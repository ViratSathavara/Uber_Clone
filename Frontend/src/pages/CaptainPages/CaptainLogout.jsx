import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    axios.get(`${import.meta.env.VITE_BASE_HOSTED_URI}/captain/logout`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            localStorage.removeItem('captain')
            navigate('/captainlogin')
        }

    })

  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout
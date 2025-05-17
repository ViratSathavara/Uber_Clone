import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    axios.get(`http://localhost:4000/users/logout`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
        }

    })

  return (
    <div>UserLogout</div>
  )
}

export default UserLogout
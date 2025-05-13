import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({children}) => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log('token', token);
  useEffect(() => {

    if (!token) {
      navigate('/login');
    }
  }, [token])

  return (
    <div>{children}</div>
  )
}

export default UserProtectWrapper
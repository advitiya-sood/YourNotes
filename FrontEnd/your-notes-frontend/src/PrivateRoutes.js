import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

function PrivateRoutes() {
    const navigate=useNavigate()

    let auth=localStorage.getItem('JWT-token')
  return (
    auth? <Outlet/> :<Navigate to='/'/>
  )
}

export default PrivateRoutes

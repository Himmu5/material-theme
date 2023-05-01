import React, { useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

function PrivateRoutes() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('admin'))?.token
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp * 1000 < Date.now()) {
        // check if token is expired
        localStorage.removeItem('admin') // remove token from local storage
        navigate('/allinallcuratorhere/login')
      }
    }
  }, [])
  const admintoken = JSON.parse(localStorage.getItem('admin'))?.token
  return admintoken ? <Outlet /> : <Navigate to="/allinallcuratorhere/login" />
}

export default PrivateRoutes

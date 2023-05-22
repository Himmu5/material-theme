import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
  const admintoken = JSON.parse(localStorage.getItem('admin'))?.token;
  return admintoken ? <Outlet /> : <Navigate to="/admin-login" />;
}

export default ProtectedRoutes;

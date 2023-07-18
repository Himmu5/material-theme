import { Box } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import SidePanel from '../../components/common/SidePanel';
import ErrorBoundary from '../../components/common/ErrorBoundry';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') navigate('/dashboard/users');
  }, []);

  return (
    <Box sx={{ display: 'flex', bgcolor: '#e8edf4' }}>
      <SidePanel />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </Box>
  );
}

export default Dashboard;

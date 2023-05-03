import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React from 'react';
import SidePanel from '../../components/common/SidePanel';

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', bgcolor: '#e8edf4' }}>
      <SidePanel />
      <Outlet />
    </Box>
  );
}

export default Dashboard;

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React from 'react';
import SidePanel from '../../components/common/SidePanel';

function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <SidePanel />
      <Outlet />
    </Box>
  );
}

export default Dashboard;

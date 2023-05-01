import { Box } from '@mui/material';
import React from 'react';
import Signups from '../../components/users/Signups';
import Purchases from '../../components/users/Purchases';
import AllBatches from '../../components/users/AllBatches';

function Users() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        pt: 3,
        pl: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 3,
        }}
      >
        <Signups />
        <Purchases />
      </Box>

      <AllBatches />
    </Box>
  );
}

export default Users;

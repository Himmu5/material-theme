import { Box, CircularProgress } from '@mui/material';
import React from 'react';

function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box sx={{ width: '0.5rem', height: '0.5rem' }}>
        <CircularProgress size={20} />
      </Box>
    </Box>
  );
}

export default Loading;

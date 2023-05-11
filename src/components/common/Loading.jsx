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
      <CircularProgress size="small" color="primary" />
    </Box>
  );
}

export default Loading;

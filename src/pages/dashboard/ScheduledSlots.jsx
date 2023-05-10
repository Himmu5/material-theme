import { Box, Typography } from '@mui/material';
import React from 'react';

function ScheduledSlots() {
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
      <Typography typography="h3" fontWeight={600}>
        Scheduled Slots
      </Typography>
    </Box>
  );
}

export default ScheduledSlots;

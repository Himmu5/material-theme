import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Courses from '../../components/schedule/courses/Courses';
import Schedules from '../../components/schedule/schedules/Schedules';

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
        gap: 2,
      }}
    >
      <Typography typography="h3" fontWeight={600}>
        Scheduled Slots
      </Typography>

      <Box sx={{ display: 'flex' }}>
        <Courses />
        <Schedules />
      </Box>
    </Box>
  );
}

export default ScheduledSlots;

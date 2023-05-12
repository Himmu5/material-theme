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

      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={5}>
          <Courses />
        </Grid>

        <Grid item xs={7}>
          <Schedules />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ScheduledSlots;

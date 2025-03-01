import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Courses from '../../components/schedule/courses/Courses';
import Schedules from '../../components/schedule/schedules/Schedules';

function ScheduledSlots() {
  const [activeCourse, setActiveCourse] = useState(null);

  const changeActive = (id) => setActiveCourse(id);

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

      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Courses activeCourse={activeCourse} changeActive={(id) => changeActive(id)} />
        <Schedules activeCourse={activeCourse} />
      </Box>
    </Box>
  );
}

export default ScheduledSlots;

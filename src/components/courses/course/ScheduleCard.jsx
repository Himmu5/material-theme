import {
  Box, Paper, Typography,
} from '@mui/material';
import React from 'react';
import MarkAttendance from '../mark-attendance/MarkAttendance';

function ScheduleCard() {
  return (
    <Box
      component={Paper}
      elevation={5}
      sx={{
        bgcolor: '#fff',
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 4,
        height: 'min(14rem,25vw)',
        overflow: 'hidden',
        flexGrow: 1,
        p: 3,
        maxWidth: '30rem',
      }}
    >
      <div>
        <Typography variant="h6" color="text.secondary">
          Today&apos;s Schedule
        </Typography>
        <Typography variant="h3" fontWeight={600}>
          Marking and Excavation
        </Typography>
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" height="100%" gap={0.4}>
          <Typography variant="h6" fontWeight={600}>
            03
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.2 }}>
            Apr,
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1, mb: 0.2 }}>
            2023
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            06
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.2 }}>
            bookings
          </Typography>
        </Box>

        <MarkAttendance />
      </Box>
    </Box>
  );
}

export default ScheduleCard;

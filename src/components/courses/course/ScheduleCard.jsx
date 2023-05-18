/* eslint-disable no-underscore-dangle */
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import MarkAttendance from '../mark-attendance/MarkAttendance';
import api from '../../../utils/api';

function ScheduleCard({ course }) {
  console.log(course);

  const today = new Date();

  useEffect(() => {
    if (course) {
      api.schedules
        .students(course?._id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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
            {today.toLocaleDateString('en-GB', { day: 'numeric' })}
          </Typography>
          <Typography variant="body2">
            {today.toLocaleDateString('en-GB', { month: 'long' })}
            ,
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {today.toLocaleDateString('en-GB', { year: 'numeric' })}
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            06
          </Typography>
          <Typography variant="body2" color="text.secondary">
            bookings
          </Typography>
        </Box>

        <MarkAttendance />
      </Box>
    </Box>
  );
}

export default ScheduleCard;

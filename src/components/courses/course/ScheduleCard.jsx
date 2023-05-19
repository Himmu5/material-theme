/* eslint-disable no-underscore-dangle */
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MarkAttendance from '../mark-attendance/MarkAttendance';
import api from '../../../utils/api';

function ScheduleCard({ batchId, courseId }) {
  const [bookings, setBookings] = useState([]);

  const today = new Date();
  const dateString = `${today.getFullYear()}-${`0${today.getMonth() + 1}`.slice(
    -2,
  )}-${`0${today.getDate()}`.slice(-2)}`;

  useEffect(() => {
    if (batchId) {
      api.schedules
        .students(batchId, dateString)
        .then((res) => {
          console.log(res.data);
          setBookings(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [batchId]);

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
            {String(bookings.length).padStart(2, '0')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            bookings
          </Typography>
        </Box>

        <MarkAttendance batchId={batchId} />
      </Box>
    </Box>
  );
}

export default ScheduleCard;

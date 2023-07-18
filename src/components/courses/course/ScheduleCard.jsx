/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import {
  Box, Paper, Skeleton, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MarkAttendance from '../mark-attendance/MarkAttendance';
import api from '../../../utils/api';
import { logout } from '../../../slices/adminAuth';

function ScheduleCard({ batchId }) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date();
  const dateString = `${today.getFullYear()}-${`0${today.getMonth() + 1}`.slice(
    -2,
  )}-${`0${today.getDate()}`.slice(-2)}`;

  useEffect(() => {
    setLoading(true);
    if (batchId) {
      api.schedules
        .slots(batchId)
        .then((res) => {
          const searchResult = res?.data && res.data.length > 0
            ? res.data.find((item) => {
              const date = new Date(item?.date);
              return date.toDateString() === today.toDateString();
            })
            : [];
          if (searchResult) {
            setSchedule(searchResult);
            api.schedules
              .bookings(batchId, dateString)
              .then((response) => {
                console.log(response);
                setSchedule((prev) => ({
                  ...prev,
                  bookings: response?.data ? response.data.length : 0,
                }));
                setLoading(false);
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          } else setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate('/admin-login');
          }
        });
    } else setLoading(false);
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
        {schedule && schedule?.lessonTitle ? (
          <Typography variant="h3" fontWeight={600}>
            {schedule.lessonTitle}
          </Typography>
        ) : loading ? (
          <Skeleton variant="text" sx={{ fontSize: 28, width: 200 }} animation="wave" />
        ) : (
          <Typography variant="h3" fontWeight={600}>
            No schedule for today
          </Typography>
        )}
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
          {schedule && schedule?.bookings ? (
            <Typography variant="h6" fontWeight={600}>
              {String(schedule.bookings).padStart(2, '0')}
            </Typography>
          ) : loading ? (
            <Skeleton variant="text" sx={{ fontSize: 18, width: 30 }} animation="wave" />
          ) : (
            <Typography variant="h6" fontWeight={600}>
              00
            </Typography>
          )}
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

/* eslint-disable no-underscore-dangle */
import {
  Box, LinearProgress, Paper, Skeleton, Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../../utils/api';
import CourseCard from './CourseCard';
import { ToastContext } from '../../contexts/ToastContext';
import { logout } from '../../../slices/adminAuth';

function Courses({ activeCourse, changeActive }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { createToast } = useContext(ToastContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.course
      .list()
      .then((res) => {
        setLoading(false);
        setCourses(res.data);
        changeActive(res?.data && res.data.length > 0 ? res.data[0]._id : null);
      })
      .catch((err) => {
        setLoading(false);
        if (err?.code === 'ERR_NETWORK') {
          createToast({ type: 'error', message: 'Network error, try again!' });
        }
        if (err?.response?.status === 401) {
          dispatch(logout());
          navigate('/admin-login');
        }
        console.log(err);
      });
  }, []);

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0.6, y: 100 }}
      transition={{ type: 'tween' }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      elevation={5}
      sx={{
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        bgcolor: 'white',
        width: 'min(35vw,35rem)',
        height: '100%',
        px: 3,
        py: 2,
        overflow: 'hidden',
      }}
    >
      {loading && <LinearProgress sx={{ mx: -3, mt: -2, mb: 1.5 }} />}

      <Typography typography="h3">Courses</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          py: 1,
        }}
      >
        {courses.length > 0
          && courses.map((course) => (
            <CourseCard
              active={course?._id === activeCourse}
              course={course}
              makeActive={() => changeActive(course?._id)}
            />
          ))}

        {loading && courses.length === 0
          ? [...new Array(3)].map(() => (
            <Skeleton variant="rounded" height={160} sx={{ borderRadius: 4 }} animation="wave" />
          ))
          : null}

        {courses.length === 0 && !loading ? (
          <Typography align="center" variant="body2" color="text.secondary">
            No courses available!
          </Typography>
        ) : null}
      </Box>
    </Paper>
  );
}

export default Courses;

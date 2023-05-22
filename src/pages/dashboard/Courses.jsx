/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, LinearProgress, Skeleton, Typography,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../utils/api';
import CourseCard from '../../components/courses/CourseCard';
import { ToastContext } from '../../components/contexts/ToastContext';
import { logout } from '../../slices/adminAuth';

const animationParent = {
  hidden: { opacity: 0, y: 10, x: 10 },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { staggerChildren: 0.05, duration: 0.05 },
  },
};

const animationChild = {
  hidden: { opacity: 0, y: 10, x: 10 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

function Courses() {
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
        console.log(res);
        setLoading(false);
        setCourses(res.data);
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
    <Box
      sx={{
        flexGrow: 1,
        height: '100vh',
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
          color="primary"
        />
      )}
      <Box
        sx={{
          py: 3,
          px: 5,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: 1,
        }}
      >
        <Typography typography="h3" fontWeight={600}>
          All Courses
        </Typography>

        {loading && courses.length === 0 && (
          <Grid container sx={{ width: '100%', py: 1 }} rowGap={3} columnGap={4}>
            <AnimatePresence>
              {[...new Array(3)].map((course) => (
                <Grid
                  item
                  xs="auto"
                  key={course?._id}
                  component={motion.div}
                  variants={animationChild}
                  viewport={{ once: true }}
                >
                  <Skeleton
                    width={270}
                    height={350}
                    sx={{ borderRadius: 4 }}
                    variant="rounded"
                    animation="wave"
                  />
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        )}

        <Grid
          container
          sx={{ width: '100%', py: 1 }}
          rowGap={3}
          columnGap={4}
          component={motion.div}
          initial="hidden"
          animate="show"
          variants={animationParent}
          viewport={{ once: true }}
        >
          {courses.length > 0
            && courses.map((course) => (
              <Grid
                item
                xs="auto"
                key={course?._id}
                component={motion.div}
                variants={animationChild}
                viewport={{ once: true }}
              >
                <CourseCard course={course} />
              </Grid>
            ))}
        </Grid>

        {courses.length === 0 && !loading ? (
          <Typography align="center" variant="body2" color="text.secondary">
            No courses available!
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

export default Courses;

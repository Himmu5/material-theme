import React, { useEffect, useState } from 'react';
import {
  Box, CircularProgress, Grid, Paper, Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import CourseCard from '../../components/courses/CourseCard';

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

        console.log(err);
      });
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 3,
        px: 5,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        gap: 1,
      }}
    >
      <Typography typography="h3" fontWeight={600}>
        All Courses
      </Typography>
      {loading && (
        <Paper
          sx={{
            borderRadius: '50%',
            bgcolor: '#fff',
            width: '2rem',
            mx: 'auto',
            height: '2rem',
            p: 0.8,
          }}
        >
          <CircularProgress color="primary" size="small" sx={{ width: '100%' }} />
        </Paper>
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
              component={motion.div}
              variants={animationChild}
              viewport={{ once: true }}
            >
              <CourseCard course={course} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Courses;

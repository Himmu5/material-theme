import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
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

  useEffect(() => {
    api.course
      .list()
      .then((res) => {
        console.log(res);
        setCourses(res.data);
      })
      .catch((err) => {
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

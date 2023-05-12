import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import CourseCard from './CourseCard';

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
        width: '100%',
        height: '100%',
        px: 3,
        py: 2,
      }}
    >
      <Typography typography="h3">Courses</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          py: 1,
        }}
      >
        { [...new Array(4)].map((course, index) => <CourseCard active={index === 0} />)}
      </Box>
    </Paper>
  );
}

export default Courses;

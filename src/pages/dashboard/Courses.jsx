import { Box } from '@mui/material';
import React from 'react';
import { motion } from 'framer-motion';
import AllBatches from '../../components/users/AllBatches';
import CoursesInfoCard from '../../components/courses/CoursesInfoCard';
import ScheduleCard from '../../components/courses/ScheduleCard';

function Courses() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        pt: 3,
        pl: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 3,
          pr: 3,
        }}
        component={motion.div}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'tween' }}
      >
        <CoursesInfoCard />
        <ScheduleCard />
      </Box>

      <AllBatches page="courses" />
    </Box>
  );
}

export default Courses;

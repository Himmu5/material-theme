import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import AllBatches from './AllBatches';
import CoursesInfoCard from './CourseInfoCard';
import ScheduleCard from './ScheduleCard';
import api from '../../../utils/api';

function Course() {
  const params = useParams();
  const courseId = params?.id ? params.id : null;

  useEffect(() => {
    api.course
      .getById('64523e36119d9d4ff40c4501')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          transformOrigin: 'left top',
        }}
        component={motion.div}
        initial={{ opacity: 0, scaleY: 0.4, scaleX: 0.1 }}
        whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
        exit={{ scaleY: 0.4, scaleX: 0.1, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'tween' }}
      >
        <CoursesInfoCard />
        <ScheduleCard />
      </Box>

      <AllBatches courseId={courseId} />
    </Box>
  );
}

export default Course;

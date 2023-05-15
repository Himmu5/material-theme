import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AllBatches from './AllBatches';
import CoursesInfoCard from './CourseInfoCard';
import ScheduleCard from './ScheduleCard';
import api from '../../../utils/api';

function Course() {
  const [course, setCourse] = useState(null);
  const params = useParams();
  const courseId = params?.id ? params.id : null;
  const navigate = useNavigate();

  useEffect(() => {
    api.course
      .getById('')
      .then((res) => {
        console.log(res);
        setCourse(res.data.length > 0 ? res.data[0] : null);
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
        gap: 1,
      }}
    >
      <Button
        startIcon={<ArrowBackIosNewIcon />}
        size="small"
        sx={{ alignSelf: 'start', mt: -2 }}
        onClick={() => navigate('/dashboard/courses')}
      >
        Go Back
      </Button>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 3,
          pr: 3,
          mb: 2,
          transformOrigin: 'left top',
        }}
        component={motion.div}
        initial={{ opacity: 0, scaleY: 0.4, scaleX: 0.1 }}
        whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
        exit={{ scaleY: 0.4, scaleX: 0.1, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'tween' }}
      >
        <CoursesInfoCard course={course} />
        <ScheduleCard />
      </Box>

      <AllBatches courseId={courseId} />
    </Box>
  );
}

export default Course;

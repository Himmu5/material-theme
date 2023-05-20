/* eslint-disable no-underscore-dangle */
import { Box, Button, LinearProgress } from '@mui/material';
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
  const [loading, setLoading] = useState(false);
  const [batchId, setBatchId] = useState(null);
  const params = useParams();
  const courseId = params?.id ? params.id : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      api.course
        .getById(courseId)
        .then((res) => {
          setCourse(res?.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  const handleBatchIdChange = (id) => setBatchId(id);

  return (
    <Box
      sx={{
        pt: 3,
        pl: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        gap: 1,
        width: 'calc(100vw - 250px)',
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
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
        <ScheduleCard batchId={batchId} courseId={course?._id} />
      </Box>

      <AllBatches
        course={course}
        filter={batchId}
        handleFilterChange={(id) => handleBatchIdChange(id)}
      />
    </Box>
  );
}

export default Course;

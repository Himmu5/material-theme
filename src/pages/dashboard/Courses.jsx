import { Box } from '@mui/material';
import React from 'react';
import AllBatches from '../../components/users/AllBatches';
import CoursesInfoCard from '../../components/courses/CoursesInfoCard';

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
        }}
      >
        <CoursesInfoCard />
      </Box>

      <AllBatches page="courses" />
    </Box>
  );
}

export default Courses;

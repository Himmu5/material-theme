import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import dummy from '../../../assets/dummy.jpg';

function CourseInfoCard() {
  return (
    <Box
      component={Paper}
      elevation={5}
      sx={{
        bgcolor: '#0F2B54',
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        borderRadius: 4,
        height: 'min(14rem,25vw)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ width: 'min(16rem,30vw)', height: 'min(14rem,25vw)', position: 'relative' }}>
        <img
          src={dummy}
          alt="thumb"
          style={{
            width: '100%',
            height: '100%',
            objectPosition: 'center center',
            objectFit: 'cover',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            px: 2,
            py: 1,
            background: 'linear-gradient(0deg, rgba(15,43,84,1) 10%, rgba(223,66,177,0) 100%)',
          }}
        >
          <Box display="flex" alignItems="end" color="white" gap={0.3}>
            <Typography variant="h6">20</Typography>
            <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
              Videos
            </Typography>
          </Box>
          <Box display="flex" alignItems="end" color="white" gap={0.3}>
            <Typography variant="h6">50</Typography>
            <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
              Visits
            </Typography>
          </Box>
          <Box display="flex" alignItems="end" color="white" gap={0.3}>
            <Typography variant="h6">30</Typography>
            <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
              Days
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: 'min(20rem,25vw)',
          color: 'white',
          height: '100%',
          py: 2.5,
          px: 0.5,
        }}
      >
        <Typography variant="h3" fontWeight={700} sx={{ mb: 2 }}>
          Getting started with Civil Engineering
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur. Elementum sit tincidunt tempus at ac.r.
        </Typography>
      </Box>
    </Box>
  );
}

export default CourseInfoCard;

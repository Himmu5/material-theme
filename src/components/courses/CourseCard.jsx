/* eslint-disable no-underscore-dangle */
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCard({ course }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 270,
        height: 350,
        overflow: 'hidden',
        bgcolor: '#fff',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { transform: 'scale(1.05)' },
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
      }}
      onClick={() => navigate(`course/${course?._id}`)}
      component={Paper}
      elevation={3}
    >
      <Box sx={{ width: 270, height: 200 }}>
        <img
          alt={course?.name}
          src={course?.coverPicture}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Typography variant="h4" fontWeight={600} color="text.primary" sx={{ p: 2 }} lineHeight={1.1}>
        {course?.name}
      </Typography>

      <Box
        sx={{
          width: '100%',
          flexGrow: 1,
          p: 2.5,
          display: 'flex',
          justifyContent: 'end',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 0.4 }}>
          By Jinny Loan
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'space-between',
          }}
        >
          <Box display="flex" alignItems="end" color="text.primary" gap={0.3}>
            <Typography variant="h6">20</Typography>
            <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
              Videos
            </Typography>
          </Box>
          <Box display="flex" alignItems="end" color="text.primary" gap={0.3}>
            <Typography variant="h6">50</Typography>
            <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
              Visits
            </Typography>
          </Box>
          <Box display="flex" alignItems="end" color="text.primary" gap={0.3}>
            <Typography variant="h6">{course?.durationInMonths}</Typography>
            <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
              {course?.durationInMonths <= 1 ? 'Month' : 'Months'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CourseCard;

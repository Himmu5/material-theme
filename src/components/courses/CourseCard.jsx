import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CourseCard({ course }) {
  const navigate = useNavigate();
  console.log(course);
  return (
    <Box
      sx={{
        width: 300,
        px: 2.5,
        py: 1.5,
        bgcolor: '#fff',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { transform: 'scale(1.08)' },
      }}
      onClick={() => navigate(`course/${course?._id}`)}
      component={Paper}
      elevation={3}
    >
      <Typography variant="h3" fontWeight={600} color="text.primary">
        {course?.name}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          px: 2,
          py: 1,
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
          <Typography variant="h6">30</Typography>
          <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
            Days
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CourseCard;

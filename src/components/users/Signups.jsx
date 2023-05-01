import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { FaUserCheck } from 'react-icons/fa';

function Signups() {
  return (
    <Box
      component={Paper}
      elevation={5}
      sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        p: 2.5,
        pr: 8,
        gap: 2,
        alignItems: 'center',
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.light',
          color: 'white',
          width: '4rem',
          height: '4rem',
          fontSize: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
        }}
      >
        <FaUserCheck />
      </Box>
      <Box>
        <Typography variant="h3" color="white" fontWeight={700}>
          21
        </Typography>
        <Typography variant="body1" color="#B8C6DB" fontWeight={500}>
          Sign Ups
        </Typography>
      </Box>
    </Box>
  );
}

export default Signups;

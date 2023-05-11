import {
  Box, IconButton, Paper, Typography,
} from '@mui/material';
import React from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { SiMicrosoftexcel } from 'react-icons/si';

function Signups() {
  return (
    <Box
      component={Paper}
      elevation={5}
      sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        p: 2.5,
        pr: 5,
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
      <Box sx={{ mr: 1 }}>
        <Typography variant="h3" color="white" fontWeight={700}>
          21
        </Typography>
        <Typography variant="body1" color="#B8C6DB" fontWeight={500}>
          Sign Ups
        </Typography>
      </Box>

      <Box sx={{ height: '4rem', bgcolor: 'rgba(255,255,255,0.3)', width: '2px' }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box ml={1} display="flex" alignItems="end" gap={1}>
          <Typography variant="h4" color="white" fontWeight={700}>
            21
          </Typography>
          <Typography variant="h6" color="#B8C6DB" fontWeight={500} sx={{ mb: 0.2 }}>
            Purchased
          </Typography>
        </Box>
        <Box ml={1} display="flex" alignItems="end" gap={1}>
          <Typography variant="h4" color="white" fontWeight={700}>
            6
          </Typography>
          <Typography variant="h6" color="#B8C6DB" fontWeight={500} sx={{ mb: 0.2 }}>
            Not purchased
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignSelf: 'end', height: '100%' }}>
        <IconButton sx={{ color: '#5DDC21', width: 40, height: 40 }}>
          <SiMicrosoftexcel />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Signups;

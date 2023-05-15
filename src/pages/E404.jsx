import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import e404 from '../../assets/404.svg';

function E404() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: '#e8edf4',
      }}
    >
      <img
        alt="404"
        src={e404}
        style={{ width: '100%', height: 'auto', maxWidth: 'min(90vw,40rem)' }}
      />
      <Typography variant="h4" color="text.secondary" fontWeight={600} sx={{ mt: 3, mx: 2 }}>
        Oops! Looks like you&apos;re lost.
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        align="center"
        lineHeight={1.6}
        fontWeight={400}
        sx={{ mx: 2, my: 1 }}
      >
        The page you&apos;re looking for does not seem to exist :(
      </Typography>

      <Button color="primary" onClick={() => navigate('/')}>
        Take me back to Home
      </Button>
    </Box>
  );
}

export default E404;

import {
  Box, Card, CardActionArea, CardMedia, Typography,
} from '@mui/material';
import React from 'react';
import dummy from '../../../../assets/dummy.jpg';

function CourseCard({ active = false }) {
  return (
    <Card sx={{ borderRadius: 4, bgcolor: active ? 'primary.dark' : '#E8EDF4', height: 160 }}>
      <CardActionArea
        sx={{
          display: 'flex',
          p: 0,
          alignItems: 'stretch',
          height: '100%',
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 160, height: 160, objectFit: 'cover' }}
          image={dummy}
          alt="Live from space album cover"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1.5,
            gap: 1,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            lineHeight={1.1}
            color={active ? '#D9D9D9' : '#333333'}
          >
            Getting started with Civil Engineering
          </Typography>
          <Typography variant="body1" color={active ? '#B8C6DB' : '#808080'}>
            Lorem ipsum dolor sit amet Elementum sit consectetur.
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default CourseCard;

import {
  Box, Card, CardActionArea, CardMedia, Typography,
} from '@mui/material';
import React from 'react';

function CourseCard({ active = false, course, makeActive }) {
  return (
    <Card
      sx={{ borderRadius: 4, bgcolor: active ? 'primary.dark' : '#E8EDF4', height: 160 }}
      onClick={() => makeActive()}
    >
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
          image={course?.coverPicture}
          alt={course?.name}
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
            {course?.name}
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

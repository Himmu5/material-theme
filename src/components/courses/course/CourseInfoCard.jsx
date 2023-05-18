import {
  Box, Paper, Skeleton, Typography,
} from '@mui/material';
import React from 'react';
import './text.css';

function CourseInfoCard({ course }) {
  return (
    <Box
      component={Paper}
      elevation={5}
      sx={{
        bgcolor: '#0F2B54',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        height: 'min(14rem,25vw)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ width: 'min(16rem,30vw)', height: 'min(14rem,25vw)', position: 'relative' }}>
        {course?.coverPicture ? (
          <img
            src={course.coverPicture}
            alt={course?.name}
            style={{
              width: '100%',
              height: '100%',
              objectPosition: 'center center',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Skeleton sx={{ width: '100%', height: '100%' }} variant="rectangular" animation="wave" />
        )}
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
            {course?.courseIncludes?.numberOfVideoLectures ? (
              <>
                <Typography variant="h6">{course.courseIncludes.numberOfVideoLectures}</Typography>
                <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
                  Videos
                </Typography>
              </>
            ) : (
              <Skeleton variant="text" sx={{ fontSize: 18, width: 60 }} animation="wave" />
            )}
          </Box>
          <Box display="flex" alignItems="end" color="white" gap={0.3}>
            {course?.courseIncludes?.totalSiteVisits ? (
              <>
                <Typography variant="h6">{course.courseIncludes.totalSiteVisits}</Typography>
                <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
                  Visits
                </Typography>
              </>
            ) : (
              <Skeleton variant="text" sx={{ fontSize: 18, width: 60 }} animation="wave" />
            )}
          </Box>
          <Box display="flex" alignItems="end" color="white" gap={0.3}>
            {course?.durationInMonths ? (
              <>
                <Typography variant="h6">{course.durationInMonths}</Typography>
                <Typography variant="body2" fontSize="10px" sx={{ mb: 0.4 }}>
                  {course.durationInMonths <= 1 ? 'Month' : 'Months'}
                </Typography>
              </>
            ) : (
              <Skeleton variant="text" sx={{ fontSize: 18, width: 60 }} animation="wave" />
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: 'min(20rem,25vw)',
          color: 'white',
          height: '100%',
          py: 2,
          px: 2,
          overflow: 'hidden',
        }}
      >
        <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }} className="multi-ellipsis-title">
          {course?.name ? course.name : <Skeleton variant="text" animation="wave" />}
        </Typography>
        {course?.description ? (
          <Typography className="multi-ellipsis">
            {course.description}
          </Typography>
        ) : (
          <>
            <Typography>
              <Skeleton variant="text" animation="wave" />
            </Typography>
            <Typography>
              <Skeleton variant="text" animation="wave" />
            </Typography>
            <Typography>
              <Skeleton variant="text" animation="wave" />
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

export default CourseInfoCard;

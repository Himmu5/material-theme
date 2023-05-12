/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import CourseCard from '../../components/courses/CourseCard';

const animationParent = {
  hidden: { opacity: 0, y: 10, x: 10 },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { staggerChildren: 0.05, duration: 0.05 },
  },
};

const animationChild = {
  hidden: { opacity: 0, y: 10, x: 10 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.course
      .list()
      .then((res) => {
        console.log(res);
        setLoading(false);
        setCourses(res.data);
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100vh',
      }}
    >
      {loading && <LinearProgress sx={{ ml: -4 }} color="primary" />}
      <Box
        sx={{
          py: 3,
          px: 5,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          gap: 1,
        }}
      >
        <Typography typography="h3" fontWeight={600}>
          All Courses
        </Typography>

        {loading && courses.length === 0 && (
          <Grid
            container
            sx={{ width: '100%', py: 1 }}
            rowGap={3}
            columnGap={4}
            component={motion.div}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10, x: -10 }}
            variants={animationParent}
            viewport={{ once: true }}
          >
            {[...new Array(3)].map((course) => (
              <Grid
                item
                xs="auto"
                key={course?._id}
                component={motion.div}
                variants={animationChild}
                viewport={{ once: true }}
              >
                <Skeleton width={270} height={350} sx={{ borderRadius: 4 }} variant="rounded" />
              </Grid>
            ))}
          </Grid>
        )}

        <Grid
          container
          sx={{ width: '100%', py: 1 }}
          rowGap={3}
          columnGap={4}
          component={motion.div}
          initial="hidden"
          animate="show"
          variants={animationParent}
          viewport={{ once: true }}
        >
          {courses.length > 0
            && courses.map((course) => (
              <Grid
                item
                xs="auto"
                key={course?._id}
                component={motion.div}
                variants={animationChild}
                viewport={{ once: true }}
              >
                <CourseCard course={course} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Courses;

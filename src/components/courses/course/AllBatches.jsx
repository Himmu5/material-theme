/* eslint-disable no-underscore-dangle */
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NewBatch from '../../common/batches/NewBatch';
import BatchesFilter from '../../common/batches/BatchesFilter';
import UsersListTable from '../../common/user-list/UsersListTable';
import { logout } from '../../../slices/adminAuth';
import api from '../../../utils/api';

function AllBatches({ course, filter, handleFilterChange }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (filter) {
      setLoading(true);
      api.batch
        .getById(filter)
        .then((res) => {
          setUsers(res.data.studentsEnrolled);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err?.response?.status === 401) {
            dispatch(logout());
            navigate('/admin-login');
          }
        });
    }
  }, [filter]);

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0.6, y: -100 }}
      transition={{ type: 'tween' }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      elevation={5}
      sx={{
        flexGrow: 1,
        borderTopLeftRadius: 32,
        bgcolor: 'white',
        width: '100%',
        px: 3,
        py: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
        <Typography typography="h3" fontWeight={600}>
          Registered Students and Progress
        </Typography>

        <NewBatch course={course} updateBatches={() => setForceUpdate((prev) => !prev)} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          mt: 1.5,
          mb: 1,
          gap: 2,
        }}
      >
        <BatchesFilter
          filter={filter}
          changeFilter={(batchId) => handleFilterChange(batchId)}
          courseId={course?._id}
          width="calc(100vw - 310px)"
          shouldUpdate={forceUpdate}
        />
      </Box>

      <UsersListTable
        page="course"
        loading={loading}
        height="calc(100vh - 450px)"
        rows={users}
        courseId={course?._id}
        courseName={course?.name ? course.name : ''}
      />
    </Paper>
  );
}

export default AllBatches;

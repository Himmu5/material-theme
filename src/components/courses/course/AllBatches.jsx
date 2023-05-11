/* eslint-disable no-underscore-dangle */
import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NewBatch from './NewBatch';
import BatchesFilter from './BatchesFilter';
import UsersListTable from '../../common/UsersListTable';
import { logout } from '../../../slices/adminAuth';
import api from '../../../utils/api';

function AllBatches({ course }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (filter) {
      api.batch
        .getByBatch(filter)
        .then((res) => {
          setUsers(res.data.studentsEnrolled);
          console.log(res.data.studentsEnrolled);
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

  const handleFilterChange = (batchId) => setFilter(batchId);

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

        <NewBatch />
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
        />
      </Box>

      <UsersListTable page="course" rows={users} loading={loading} />
    </Paper>
  );
}

export default AllBatches;

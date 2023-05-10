import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NewBatch from './NewBatch';
import BatchesFilter from './BatchesFilter';
import UsersListTable from './UsersListTable';
import { logout } from '../../slices/adminAuth';
import api from '../../utils/api';

function AllBatches({ page = 'users' }) {
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
    } else {
      api.users
        .list()
        .then((res) => {
          setUsers(res.data);
          console.log(res.data);
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

  console.log(filter);

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0.6, y: page === 'users' ? 100 : -100 }}
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
          {page === 'users' ? 'All Users' : 'Registered Students and Progress'}
        </Typography>

        {page === 'users' && <NewBatch />}
      </Box>

      {page === 'courses' && (
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
          <BatchesFilter filter={filter} changeFilter={(batchId) => handleFilterChange(batchId)} />
        </Box>
      )}

      <UsersListTable page={page} rows={users} loading={loading} />
    </Paper>
  );
}

export default AllBatches;

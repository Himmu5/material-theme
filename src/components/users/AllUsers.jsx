import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UsersListTable from '../common/UsersListTable';
import { logout } from '../../slices/adminAuth';
import api from '../../utils/api';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    api.users
      .list()
      .then((res) => {
        setUsers(res.data.students);
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
  }, []);

  // const handleFilterChange = (batchId) => setFilter(batchId);

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0.6, y: 100 }}
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
      <Typography typography="h3" fontWeight={600}>
        All Users
      </Typography>

      <UsersListTable page="users" rows={users} loading={loading} height="calc(100vh - 240px)" />
    </Paper>
  );
}

export default AllUsers;

import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Signups from '../../components/users/Signups';
import AllUsers from '../../components/users/AllUsers';
import api from '../../utils/api';
import { logout } from '../../slices/adminAuth';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    api.users
      .list()
      .then((res) => {
        setUsers(res?.data?.students);
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

  return (
    <Box
      sx={{
        flexGrow: 1,
        pt: 3,
        pl: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 3,
        }}
        component={motion.div}
        initial={{ opacity: 0, y: 100 }}
        transition={{ type: 'tween' }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        viewport={{ once: true }}
      >
        <Signups loadingSheet={loading} users={users} />
        {/* <Purchases /> */}
      </Box>

      <AllUsers users={users} loading={loading} />
    </Box>
  );
}

export default Users;

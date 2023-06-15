import { Paper, Typography } from '@mui/material';
import React from 'react';
import { motion } from 'framer-motion';
import UsersListTable from '../common/user-list/UsersListTable';
import CertificateUpload from '../common/certificate-upload/CertificateUpload';

function AllUsers({ users, loading }) {
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

      <CertificateUpload />
    </Paper>
  );
}

export default AllUsers;

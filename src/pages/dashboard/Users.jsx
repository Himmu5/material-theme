import { Box } from '@mui/material';
import React from 'react';
import { motion } from 'framer-motion';
import Signups from '../../components/users/Signups';
import AllBatches from '../../components/users/AllBatches';

function Users() {
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
        <Signups />
        {/* <Purchases /> */}
      </Box>

      <AllBatches />
    </Box>
  );
}

export default Users;

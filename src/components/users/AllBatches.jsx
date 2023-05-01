import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import BatchesNav from './BatchesNav';
import NewBatch from './NewBatch';
import UsersList from './UsersList';

function AllBatches({ page = 'users' }) {
  return (
    <Box
      component={Paper}
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
        {page === 'users' ? 'All Batches' : 'Registered Students and Progress'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          my: 2,
          gap: 2,
        }}
      >
        <BatchesNav />
        <NewBatch />
      </Box>

      <UsersList page={page} />
    </Box>
  );
}

export default AllBatches;

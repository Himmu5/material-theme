import { Box, Chip } from '@mui/material';
import React from 'react';

function BatchesNav() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        gap: 1.5,
        display: 'flex',
        maxWidth: 'calc(100vw - min(500px,35vw))',
        overflowX: 'auto',
      }}
    >
      {[...new Array(5)].map((batch, index) => (
        <Chip
          key={batch}
          label={`Batch ${index + 1}`}
          color="primary"
          variant={index === 0 ? 'filled' : 'outlined'}
          onClick={() => {}}
        />
      ))}
    </Box>
  );
}

export default BatchesNav;

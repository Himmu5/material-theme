import {
  Box, Button, LinearProgress, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import WorkshopList from '../../components/workshops/WorkshopList';

function Workshops() {
  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100vh',
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
          color="primary"
        />
      )}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography typography="h3" fontWeight={600}>
            Workshops
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            // onClick={handleClickOpen}
            // disabled={!course}
          >
            Add Workshop
          </Button>
        </Box>

        <WorkshopList />
      </Box>
    </Box>
  );
}

export default Workshops;

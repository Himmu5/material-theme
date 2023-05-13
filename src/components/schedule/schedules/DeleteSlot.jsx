import { IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteSlot() {
  return (
    <IconButton size="small" color="error">
      <DeleteIcon fontSize="18" />
    </IconButton>
  );
}

export default DeleteSlot;

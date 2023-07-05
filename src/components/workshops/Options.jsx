import {
  Dialog, DialogContent, List, ListItem, Menu, MenuItem,
} from '@mui/material';
import React from 'react';

function Options({ anchorEl, close }) {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={close}
    >
      <MenuItem onClick={close}>Edit</MenuItem>
      <MenuItem onClick={close}>Delete</MenuItem>
    </Menu>
  );
}

export default Options;

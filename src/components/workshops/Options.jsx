import { Menu, MenuItem } from '@mui/material';
import React from 'react';

function Options({ anchorEl, close , setOpen , setMode }) {
  function handleDelete(){
    setOpen(true);
    getDeleteItem(id);
    open();
  }
  function editButton(){
    setMode("update");
    // setOpen(true);
  }
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
      <MenuItem onClick={editButton}>Edit</MenuItem>
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu>
  );
}

export default Options;

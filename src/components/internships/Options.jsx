import { Menu, MenuItem } from '@mui/material';
import React from 'react';

function Options({ anchorEl,open ,close , setMode , setOpen , id , getDeleteItem}) {
  function handleDelete(){
    setOpen(true);
    getDeleteItem(id);
    open();
    close()
  }
  function editButton(){
    setMode("update");
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

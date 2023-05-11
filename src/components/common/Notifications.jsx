import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Badge,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';

function Notifications() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);

  const handleOpenClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="white"
        size="small"
        sx={{
          ml: 0,
          mr: 3,
          color: '#fff',
          fontSize: 22,
          mt: 1,
        }}
        onClick={handleOpenClick}
      >
        <Badge
          badgeContent={9}
          sx={{ color: 'white' }}
          color="tertiary"
          variant="dot"
          overlap="circular"
        >
          <NotificationsIcon fontSize="inherit" />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="notifications"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          style: { maxHeight: 300, width: 450 },
          sx: {
            overflow: 'visible',
            borderRadius: 3,
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 0.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 12,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Typography variant="h5" fontWeight={600} sx={{ px: 2, mt: 1 }}>
          Notifications
        </Typography>
        {loading && (
          <Box
            sx={{
              borderRadius: '50%',
              bgcolor: '#fff',
              width: '2rem',
              mx: 'auto',
              height: '2rem',
              p: 0.8,
            }}
          >
            <CircularProgress color="primary" size="small" sx={{ width: '100%' }} />
          </Box>
        )}
        <MenuList sx={{ overflowY: 'auto', maxHeight: 240 }}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <Divider variant="middle" />
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default Notifications;

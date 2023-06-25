import React, { useEffect, useState } from 'react';
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
import api from '../../utils/api';

function Notifications() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const open = Boolean(anchorEl);

  const formatDateValue = (dateVal) => {
    const date = new Date(dateVal);
    return `${`0${date.getDate()}`.slice(-2)}/${`0${date.getMonth() + 1}`.slice(
      -2,
    )}/${date.getFullYear()}`;
  };

  const handleOpenClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setLoading(true);
    api.notification
      .list_new()
      .then((res) => {
        console.log(res);
        setNotifications(res?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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
          style: { maxHeight: 400, width: 450 },
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

        <MenuList sx={{ overflowY: 'auto', width: '100%', maxHeight: 280 }}>
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
          {notifications.length > 0
            && notifications.map((noti, index) => (
              <>
                <MenuItem
                  onClick={() => {}}
                  sx={{
                    whiteSpace: 'normal',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    pb: 0,
                  }}
                >
                  <Typography variant="body2">{noti?.message}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'end' }}>
                    {formatDateValue(noti?.createdAt)}
                  </Typography>
                </MenuItem>
                {index !== notifications.length - 1 && <Divider variant="middle" />}
              </>
            ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default Notifications;

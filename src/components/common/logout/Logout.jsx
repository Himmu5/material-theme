import {
  Button,
  CircularProgress,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../../contexts/ToastContext';
import { logout } from '../../../slices/adminAuth';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

function Logout() {
  const [open, setOpen] = React.useState(false);
  const { createToast } = useContext(ToastContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    // localStorage.removeItem('user')
    createToast({
      type: 'success',
      message: 'Logged out successfully',
    });
    handleClose();
    setTimeout(() => {
      navigate('/admin-login');
      window.location.reload();
    }, [1000]);
  };

  return (
    <>
      <Button
        sx={{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
        fullWidth
        onClick={handleClickOpen}
      >
        <BiLogOut />
        Log Out
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle sx={{ mt: 2, mx: 2 }}>
          {handleClose ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              size="small"
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}

          <Typography variant="h4" align="center" fontWeight={600}>
            Are you sure?
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ width: 350, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body1" align="center" fontWeight={500} color="text.secondary">
            Do you really wish to log out
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mx: 2 }}>
          <Button onClick={handleClose} type="button" variant="outlined" fullWidth>
            No
          </Button>
          <Button variant="contained" color="error" fullWidth onClick={handleLogout}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Logout;

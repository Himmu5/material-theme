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
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContext } from '../contexts/ToastContext';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

function DeleteVouchers({ deleteVouchers, updateList, count }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { createToast } = useContext(ToastContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setLoading(true);
    deleteVouchers()
      .then(() => {
        setLoading(false);
        handleClose();
        createToast({
          type: 'success',
          message: `Deleted ${count} voucher(s) successfully`,
        });
        updateList();
      })
      .catch((err) => {
        setLoading(false);
        createToast({ type: 'error', message: 'Failed to delete voucher(s), try again!' });
        console.log(err);
      });
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        disableElevation
        onClick={handleClickOpen}
      >
        Delete
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
        <DialogContent sx={{ width: 400, display: 'flex' }}>
          <Typography variant="body1" align="center" fontWeight={500} color="text.secondary">
            Do you realy want to delete these vouchers? this process cannot be undone
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mx: 2 }}>
          <Button
            onClick={handleClose}
            type="button"
            variant="outlined"
            fullWidth
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            disabled={loading}
            endIcon={loading ? <CircularProgress size={14} /> : undefined}
            onClick={handleDelete}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteVouchers;

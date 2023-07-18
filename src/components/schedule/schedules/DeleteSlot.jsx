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
import { ToastContext } from '../../contexts/ToastContext';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

function DeleteSlot({ slot, deleteSlot, updateList }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { createToast } = useContext(ToastContext);

  const date = new Date(slot?.date);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setLoading(true);
    deleteSlot()
      .then(() => {
        setLoading(false);
        createToast({
          type: 'success',
          message: 'Deleted slot successfully',
        });
        handleClose(e);
        updateList();
      })
      .catch((err) => {
        createToast({ type: 'error', message: 'Failed to delete slot, try again!' });
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <IconButton size="small" color="error" onClick={handleClickOpen}>
        <DeleteIcon fontSize="18" />
      </IconButton>

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
            Do you really want to delete the site visit scheduled on
            {' '}
            <span style={{ color: '#000000' }}>
              {`${date.toLocaleDateString('en-GB', { day: 'numeric' })} ${date.toLocaleDateString(
                'en-GB',
                { month: 'long' },
              )} ${date.toLocaleDateString('en-GB', { year: 'numeric' })}  ${slot?.time}`}
            </span>
            ?
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

export default DeleteSlot;

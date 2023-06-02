import React, { useState } from 'react';
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DragDropInput from './DragDropInput';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

function CertificateUpload({ isOpen, close }) {
  return (
    <div>
      <Dialog open={isOpen} onClose={() => close()} maxWidth="sm">
        <DialogTitle sx={{ mt: 2, mx: 2 }}>
          <IconButton
            aria-label="close"
            onClick={() => close()}
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

          <Typography variant="h4" fontWeight={600}>
            Upload and attach files
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Supported formats: jpg, jpeg, png, pdf
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <DragDropInput />
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CertificateUpload;

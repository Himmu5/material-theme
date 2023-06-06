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
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DragDropInput from './DragDropInput';
import api from '../../../utils/api';

const Dialog = styled(MuiDialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    overflowX: 'hidden',
  },
}));

function CertificateUpload({
  isOpen, close, courseId, studentId,
}) {
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadFile = () => {
    if (file.length > 0 && courseId && studentId) {
      setLoading(true);
      console.log(file[0]);
      api.certificate
        .s3url({ file_names: [file[0].name] })
        .then((res) => {
          console.log(res);
          api.certificate
            .upload(courseId, studentId, { certificate: res.data[0].url })
            .then((response) => {
              console.log(response);
              close();
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

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
          <DragDropInput file={file} changeFile={(fileVal) => setFile(fileVal)} />
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="outlined" disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={file.length === 0 || loading}
            onClick={uploadFile}
            endIcon={loading ? <CircularProgress size={20} /> : undefined}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CertificateUpload;

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
  isOpen,
  close,
  courseId,
  studentId,
  download = false,
  downloadUrl = null,
}) {
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(download, downloadUrl);

  const uploadFile = () => {
    console.log(file, courseId, studentId);
    if (file.length > 0 && courseId && studentId) {
      setLoading(true);
      // console.log(file[0]);
      api.certificate
        .s3url({ file_names: [file[0].name] })
        .then((res) => {
          console.log(res);
          const url = res && res?.data && res.data.length > 0 ? res.data[0].url : null;
          api.certificate
            .upload(url, file[0])
            .then((res) => {
              console.log(res);
              api.certificate
                .save(courseId, studentId, url)
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
        <DialogTitle>
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
            {download && downloadUrl ? 'Download Certificate' : 'Upload and attach files'}
          </Typography>
          {!(download && downloadUrl) ? (
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Supported formats: jpg, jpeg, png, pdf
            </Typography>
          ) : null}
        </DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <DragDropInput
            file={file}
            changeFile={(fileVal) => setFile(fileVal)}
            download={download}
            downloadUrl={downloadUrl}
          />
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="outlined" disabled={loading}>
            Cancel
          </Button>
          {download && downloadUrl ? (
            <Button
              href={downloadUrl}
              download={String(downloadUrl).split('/').pop()}
              variant="contained"
              sx={{ ml: 2 }}
            >
              Download
            </Button>
          ) : (
            <Button
              variant="contained"
              disabled={file.length === 0 || loading}
              onClick={uploadFile}
              endIcon={loading ? <CircularProgress size={20} /> : undefined}
            >
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CertificateUpload;

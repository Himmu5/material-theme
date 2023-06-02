/* eslint-disable no-nested-ternary */
import {
  Box, Button, IconButton, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import uploadSvg from '../../../../assets/upload.svg';

function DragDropInput() {
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);
  const [file, setFile] = useState([]);
  const [error, setError] = useState(null);

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const bytesToMb = (bytes) => (Number(bytes) / (1024 * 1024)).toFixed(2);

  const typeValidity = (f) => f?.type
    && (f.type === 'image/jpeg'
      || f.type === 'image/jpg'
      || f.type === 'image/png'
      || f.type === 'application/pdf');

  // triggers when file is dropped
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      console.log(String(typeValidity(e.dataTransfer.files[0])));
      if (bytesToMb(e.dataTransfer.files[0].size) > 50) {
        setError('large');
        inputRef.current.value = '';
      } else if (!typeValidity(e.dataTransfer.files[0])) {
        setError('invalid');
        inputRef.current.value = '';
      } else {
        setFile(e.dataTransfer.files);
        setError(null);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      console.log(e.target.files[0]);

      if (bytesToMb(e.target.files[0].size) > 50) {
        setError('large');
        inputRef.current.value = '';
      } else if (!typeValidity(e.target.files[0])) {
        setError('invalid');
        inputRef.current.value = '';
      } else {
        setFile(e.target.files);
        setError(null);
      }
    }
  };

  const onAreaClick = () => {
    inputRef.current.click();
  };

  const onClear = () => {
    setFile([]);
  };

  console.log(inputRef?.current?.value ? inputRef.current.value : '', file);

  return (
    <Box>
      {file.length > 0 ? (
        <Box
          sx={{
            bgcolor: '#E8EDF4',
            borderRadius: 3,
            py: 2,
            px: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Typography variant="body1" fontWeight={500}>
              {file[0]?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {bytesToMb(file[0]?.size)}
              {' '}
              MB
            </Typography>
          </div>

          <IconButton
            onClick={onClear}
            size="small"
            sx={{
              width: 32,
              height: 32,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <form onDragEnter={handleDrag} style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleChange}
            // accept="image/jpeg,image/jpg,image/png,application/pdf"
          />
          {dragActive && (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '1rem',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
          )}
          <Box
            onClick={onAreaClick}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 6,
              bgcolor: dragActive ? 'tertiary.light' : '#F8F8F8',
              border: '1px dashed #B8C6DB',
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                width: 'min(10vw,10rem)',
                height: '10vw',
                position: 'relative',
              }}
            >
              <img
                src={uploadSvg}
                alt="logo"
                style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button sx={{ textDecoration: 'underline' }} size="small">
                Browse files
              </Button>
              <Typography variant="body1">or Drag and drop</Typography>
            </Box>

            {error ? (
              <Typography variant="caption" color="#dd0000">
                {error === 'large'
                  ? 'File size exceeds 50 MB!'
                  : error === 'invalid'
                    ? 'Invalid file type!'
                    : ''}
              </Typography>
            ) : (
              <Typography variant="caption" color="text.secondary">
                Maximum file size 50 MB
              </Typography>
            )}
          </Box>
        </form>
      )}
    </Box>
  );
}

export default DragDropInput;

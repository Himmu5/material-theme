/* eslint-disable react/jsx-props-no-spreading */
import { Alert, Slide, Snackbar } from '@mui/material';
import React, { createContext, useRef, useState } from 'react';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

function Toast({
  type, message, isOpen, handleSnackbarClose, handleExited,
}) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={handleSnackbarClose}
      TransitionProps={{ onExited: handleExited }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        variant="standard"
        onClose={handleSnackbarClose}
        severity={type}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(undefined);
  const queueRef = useRef([]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function processQueue() {
    if (queueRef.current.length > 0) {
      setOpen(true);
      setSnackbar(queueRef.current.shift());
    }
  }

  const createToast = (toastMessage) => {
    queueRef.current.push(toastMessage);

    if (open) setOpen(false);
    else processQueue();
  };

  function handleExited() {
    processQueue();
  }

  return (
    <ToastContext.Provider value={{ createToast }}>
      {children}
      <Toast
        isOpen={open}
        {...snackbar}
        handleSnackbarClose={handleSnackbarClose}
        handleExited={handleExited}
      />
    </ToastContext.Provider>
  );
}

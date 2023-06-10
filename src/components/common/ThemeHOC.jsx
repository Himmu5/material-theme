import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import theme from '../../themes/theme';
import { ToastProvider } from '../contexts/ToastContext';

function ThemeHOC({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CssBaseline />
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}

export default ThemeHOC;

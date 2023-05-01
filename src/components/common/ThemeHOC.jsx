import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import theme from '../../themes/theme';

function ThemeHOC({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ThemeHOC;

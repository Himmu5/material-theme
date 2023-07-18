import { Box, Typography } from '@mui/material';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: '', stack: '' };
  }

  componentDidCatch(error, info) {
    this.setState({ error: `${error.name}: ${error.message}`, stack: info.componentStack });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <Box sx={{
          display: 'flex', flexDirection: 'column', p: 3, gap: 1,
        }}
        >
          <Typography variant="h5">{this.state.error}</Typography>
          <Typography variant="body2">{this.state.stack}</Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import {
  Box, Button, CircularProgress, FormControl, InputBase, Typography,
} from '@mui/material';
import React from 'react';

function LoginForm({ formik, loading }) {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 3,
        mt: 2,
        width: 'min(90%,470px)',
      }}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="body1" align="center" color="text.secondary" fontWeight={500}>
        Login to your account
      </Typography>

      <FormControl fullWidth>
        <Typography variant="body1" color="text.secondary" component="label" htmlFor="email">
          Email
        </Typography>
        <InputBase
          id="email"
          type="email"
          name="email"
          size="small"
          sx={{ mt: 1 }}
          fullWidth
          color="secondary"
          autoFocus
          disabled={loading}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </FormControl>
      <FormControl fullWidth>
        <Typography variant="body1" color="text.secondary" component="label" htmlFor="password">
          Password
        </Typography>
        <InputBase
          type="password"
          id="password"
          name="password"
          size="small"
          sx={{ mt: 1 }}
          fullWidth
          color="secondary"
          disabled={loading}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          endIcon={
            loading ? <CircularProgress size={14} /> : undefined
          }
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;

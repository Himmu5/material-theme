import {
  Box,
  Button,
  FormControl,
  InputBase,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const LoginForm = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 3,
        mt: 2,
        width: "min(90%,470px)",
      }}
    >
      <Typography variant="body1" align="center" color="text.secondary" fontWeight={500}>
        Login to your account
      </Typography>

      <FormControl fullWidth>
        <Typography
          variant="body1"
          color="text.secondary"
          component="label"
          htmlFor="email"
        >
          Email
        </Typography>
        <InputBase id="email" type="email" name="email" size="small" sx={{ mt: 1 }} />
      </FormControl>
      <FormControl fullWidth>
        <Typography
          variant="body1"
          color="text.secondary"
          component="label"
          htmlFor="password"
        >
          Password
        </Typography>
        <InputBase
          type="password"
          id="password"
          name="password"
          size="small"
          sx={{ mt: 1 }}
        />
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained">Confirm</Button>
      </Box>
    </Box>
  );
};

export default LoginForm;

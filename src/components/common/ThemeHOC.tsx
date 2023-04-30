import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@themes/theme";
import React from "react";

type ThemeHOCProps = {
    children: any;
  };

const ThemeHOC: React.FC<ThemeHOCProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeHOC;

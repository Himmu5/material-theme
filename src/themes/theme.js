import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;

const themeBefore = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#19488C',
    },
    secondary: {
      main: '#6EAAD4',
    },
    tertiary: augmentColor({ color: { main: '#eae2f1' } }),
  },
  typography: {
    fontSize: 16,
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    h1: {
      fontSize: '48px',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h2: {
      fontSize: '38px',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h3: {
      fontSize: '30px',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h4: {
      fontSize: '24px',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h5: {
      fontSize: '20px',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    h6: {
      fontSize: '18px',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '18px',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '16px',
      lineHeight: 1.5,
      fontWeight: 300,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '12px',
      lineHeight: 1.5,
    },
    overline: { fontSize: '16px', lineHeight: 1.5 },
    button: { fontSize: '16px', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            borderRadius: '8px',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderRadius: '8px',
          },
        },
      ],
    },
    MuiInputBase: {
      variants: [
        {
          props: {},
          style: {
            borderRadius: '8px',
            padding: '12px 16px 4px 16px',
            backgroundColor: '#F4F4F4',
          },
        },
      ],
    },
  },
});

const theme = responsiveFontSizes(themeBefore);

export default theme;

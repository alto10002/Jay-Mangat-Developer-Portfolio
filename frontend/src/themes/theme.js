import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      main: '#f9fbfd',
    },
    primary: {
      main: "#929292",
    },
    secondary: {
      main: "#732979",
    },
    accent: {
      main: "#dcac00",
    },
    text: {
      primary: "#06080b",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Rubik', sans-serif" },
    h2: { fontFamily: "'Rubik', sans-serif" },
    h3: { fontFamily: "'Rubik', sans-serif" },
    h4: { fontFamily: "'Rubik', sans-serif" },
    h5: { fontFamily: "'Rubik', sans-serif" },
    h6: { fontFamily: "'Rubik', sans-serif" },
  },
});

export default theme;

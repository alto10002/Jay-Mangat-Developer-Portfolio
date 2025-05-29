// src/theme.js
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    background: {
      default: mode === 'light' ? '#1b404b' : '#06080b',
      paper: mode === 'light' ? '#ffffff' : '#0e0e0e',
    },
    primary: {
      main:  mode === 'light' ? '#d1e4e8' : '#929292', 
    },
    secondary: {
      main:  mode === 'light' ? '#06080b' : '#732979',
    },
    accent: {
      main: mode === 'light' ? '#d1e4e8' : '#dcac00'
    },
    text: {
      primary: mode === 'light' ? '#f0f0f0' : '#f0f0f0',
      secondary: mode === 'light' ? '#333' : '#aaa',
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

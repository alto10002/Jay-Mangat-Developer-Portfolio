// src/theme.js
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    background: {
      default: mode === 'light' ? '#e1e1e1' : '#06080b',
      paper: mode === 'light' ? '#ffffff' : '#0e0e0e',
    },
    primary: {
      main:  mode === 'light' ? '#2db8d1' : '#929292', 
    },
    secondary: {
      main:  mode === 'light' ? '#06080b' : '#732979',
    },
    accent: {
      main: mode === 'light' ? '#b372fd' : '#dcac00'
    },
    text: {
      primary: mode === 'light' ? '#06080b' : '#f0f0f0',
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

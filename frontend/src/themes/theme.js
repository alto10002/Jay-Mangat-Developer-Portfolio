export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    background: {
      default: mode === "light" ? "#1b404b" : "#06080b",
      paper: mode === "light" ? "#ffffff" : "#0e0e0e",
    },
    primary: {
      main: mode === "light" ? "#d1e4e8" : "#929292",
    },
    secondary: {
      main: mode === "light" ? "#06080b" : "#732979",
    },
    accent: {
      main: mode === "light" ? "#d1e4e8" : "#dcac00",
    },
    text: {
      primary: mode === "light" ? "#f0f0f0" : "#f0f0f0",
      card: mode === "light" ? "#000000" : "#f0f0f0",
    },
    homepage: {
      card: "#2a2f31",
      text: "#f0f0f0",
      button: "#c9264a",
      button2: "#0213ad",
    },
    youtubePage: {
      youtubeRed: "#FF0000",
      background: "#2e2e2e",
      sidebar: mode === "light" ? "#b5b5b5" : "#1c1c1c",
      sidebarText: mode === "light" ? "#000000" : "#f0f0f0",
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
    youtubePage_sidebar: {
      color: "#f0f0f0",
      fontSize: "1.5rem",
      fontWeight: 1000,
      fontFamily: "'Rubik', sans-serif",
    },
  },
});

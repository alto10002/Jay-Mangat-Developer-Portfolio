export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    background: {
      // default: mode === "light" ? "#1b404b" : "#06080b",
      // paper: mode === "light" ? "#ffffff" : "#0e0e0e",
      default: mode === "light" ? "#06080b" : "#1b404b",
      paper: mode === "light" ? "#0e0e0e" : "#ffffff",
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
      card: mode === "light" ? "#f0f0f0" : "#000000",
    },
    homepage: {
      background: "#0a0a0a",
      card: "#2a2f31",
      text: "#f0f0f0",
      button: "#c9264a",
      button2: "#0213ad",
    },
    youtubePage: {
      youtubeRed: "#800000",
      sidebarBackground: "#222831",
      sidebarAccordian: "#393E46",
      mainAreaBackground: "#222831",
      mainAreaCard: "#393E46",
      mainAreaText: "#F2E8C6",
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
      color: "#FFFFFF",
      fontSize: "1.5rem",
      fontWeight: 1000,
      fontFamily: "'Rubik', sans-serif",
    },
  },
});

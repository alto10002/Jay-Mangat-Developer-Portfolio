// index.js
import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getDesignTokens } from './themes/theme'; // <-- updated import
import { createTheme } from "@mui/material/styles";

const Root = () => {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
        <App mode={mode} setMode={setMode} />
      </React.StrictMode>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// App.js
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { Box, Button } from "@mui/material";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RecipePage from "./pages/RecipePage";
import { useTheme } from "@mui/material/styles";

function App({ mode, setMode }) {
  const theme = useTheme();

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/recipes" element={<RecipePage mode={mode} setMode={setMode} />} />
          <Route path="/about" element={<AboutPage mode={mode} setMode={setMode} />} />
          <Route path="/" element={<HomePage mode={mode} setMode={setMode} />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;

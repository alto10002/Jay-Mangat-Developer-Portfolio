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
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: "100vh" }}>
      <Router>
        {/* <nav className="navbar">
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/recipes">Recipe Generator</Link>
          <a
            href="https://www.linkedin.com/in/jay-mangat/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <AiFillLinkedin color="#ffc401" />
          </a>
          <a href="https://github.com/alto10002" target="_blank" rel="noopener noreferrer" className="icon-link">
            <AiFillGithub color="#ffc401" />
          </a>
          <Button onClick={toggleTheme} size="small" sx={{ ml: 2 }}>
            Toggle {mode === "light" ? "Dark" : "Light"} Mode
          </Button>
        </nav> */}

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

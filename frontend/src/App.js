import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import Box from '@mui/material/Box';

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RecipePage from "./pages/RecipePage";

function App() {
  return (
    <Box sx={{ bgcolor:"background.main" }}>
      <Router>
        <nav className="navbar">
          <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
          <Link to="/recipes">Recipe Generator</Link>
          <a
            href="https://www.linkedin.com/in/jay-mangat/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <AiFillLinkedin color="#ffc401" />
          </a>
          <a
            href="https://github.com/alto10002"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <AiFillGithub color="#ffc401" />
          </a>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recipes" element={<RecipePage />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;

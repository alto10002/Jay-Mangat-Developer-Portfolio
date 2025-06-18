import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import YoutubePage from "./pages/YoutubePage";
import RecipePage from "./pages/RecipePage";
// import { useTheme } from "@mui/material/styles";

function App({ mode, setMode }) {
  // const theme = useTheme();

  // const toggleTheme = () => {
  //   setMode((prev) => (prev === "light" ? "dark" : "light"));
  // };

  return (
    <Router>
      <Routes>
        <Route path="/recipes" element={<RecipePage mode={mode} setMode={setMode} />} />
        <Route path="/youtube_trends" element={<YoutubePage mode={mode} setMode={setMode} />} />
        <Route path="/" element={<HomePage mode={mode} setMode={setMode} />} />
      </Routes>
    </Router>
  );
}

export default App;

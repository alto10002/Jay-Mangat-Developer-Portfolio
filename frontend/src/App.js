import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import YoutubePage from "./pages/YoutubePage";
import RecipePage from "./pages/RecipePage";
import ProjectsPage from "./pages/ProjectsPage";
import ReportsPage from "./pages/ReportsPage";

function App({ mode, setMode }) {
  return (
    <Router>
      <Routes>
        <Route path="/recipes" element={<RecipePage mode={mode} setMode={setMode} />} />
        <Route path="/youtube_trends" element={<YoutubePage mode={mode} setMode={setMode} />} />
        <Route path="/" element={<HomePage mode={mode} setMode={setMode} />} />
        <Route path="/projects" element={<ProjectsPage mode={mode} setMode={setMode} />} />
        <Route path="/reports" element={<ReportsPage mode={mode} setMode={setMode} />} />
      </Routes>
    </Router>
  );
}

export default App;

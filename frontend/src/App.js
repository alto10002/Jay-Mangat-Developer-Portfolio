import { useState, useEffect } from 'react';
import './App.css';
import Select from 'react-select';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
// import axios from 'axios';

// need to import each page that'll be connected to/shown as a link
// Frontend/backend code for those pages should be in respective files not in app
// import { HomePage, AboutPage, RecipePage } from "pages";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RecipePage from "./pages/RecipePage";



function App() {
  // const [submit, selectedIngredients] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [ingre_dropdown, setIngreDropdown] = useState('');

  useEffect(() => {
    fetch("http://localhost:8000/ingredients")
      .then((res) => res.json())
      .then((data) => setIngreDropdown(data))
      .catch((err) => console.error("Error fetching ingredients:", err));
  }, []);

  return (
    <div>
      <Router>
        <nav className='navbar'>
          <Link to="/">Home</Link> |{" "}
          <Link to="/about">About</Link> | {" "}
          <Link to='/recipes'>Recipe Generator</Link>
          <a
            href = 'https://github.com/alto10002'
            target = "_blank"
            rel="noopener noreferrer"
            className="icon-link">
            <AiFillLinkedin color="#ffc401"/>
          </a>
          <a
            href = 'https://www.linkedin.com/in/jay-mangat/'
            target = "_blank"
            rel="noopener noreferrer"
            className="icon-link">
            <AiFillGithub color="#ffc401"/>
          </a>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recipes" element={<RecipePage />} />
        </Routes>
      </Router>
      <br/>
      <h1>Recipe Generator</h1>
      <p>Enter ingredients here:</p>
      <Select
        defaultValue={[]}
        isMulti
        name="colors"
        options={ingre_dropdown}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      {/* <button onClick={() => setIngredientSubmission(input)}>Submit</button> */}



    </div>
  );
}

export default App;

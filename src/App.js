import { useState, useEffect } from 'react';
import './App.css';
import Select from 'react-select';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// need to import each page that'll be connected to/shown as a link
// Frontend/backend code for those pages should be in respective files not in app
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Recipes from "./RecipePage";

function App() {
  const [input, setInput] = useState('');
  const [submit, setIngredientSubmission] = useState('');
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
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/about">About</Link> | {" "}
          <Link to='/recipes'>Recipe Generator</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </Router>
      <br/>
      <h1>Recipe Generator</h1>
      <p>Enter ingredients here:</p>
      {/* <input type="search" id="test_input" onChange={(e) => setInput(e.target.value)}/> */}
      {/* <br/> */}
      {/* <p>You inputted: {input}</p> */}
      {/* <button onClick={() => setIngredientSubmission(input)}>Submit</button> */}
      {/* <p>Submitted: {submit}</p> */}
      {/* <br/> */}
      <Select
        defaultValue={[]}
        isMulti
        name="colors"
        options={ingre_dropdown}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <button onClick={() => setIngredientSubmission(input)}>Submit</button>



    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import Select from "react-select";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { Button, CardHeader, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// need to import each page that'll be connected to/shown as a link
// Frontend/backend code for those pages should be in respective files not in app
// import { HomePage, AboutPage, RecipePage } from "pages";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RecipePage from "./pages/RecipePage";

function App() {
  const [selected, setSelectedOptions] = useState([]);
  const [ingredient_dropdown, setIngreDropdown] = useState([]);
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [firstRecipe, setFirstRecipe] = useState([]);

  // Get list of ingredients from csv data file
  useEffect(() => {
    fetch("http://localhost:8000/ingredients")
      .then((res) => res.json())
      .then((data) => setIngreDropdown(data))
      .catch((err) => console.error("Error fetching ingredients:", err));
  }, []);

  const submitIngredients = async () => {
    const response = await fetch("http://localhost:8000/generate_recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_ingredients: selected.map((opt) => opt.value),
      }),
    });

    const found_recipes = await response.json();
    setFoundRecipes(found_recipes.length);
    setFirstRecipe(found_recipes[0]);
  };

  const tot_ingredients = ingredient_dropdown.length;

  const tot_recipes_card = (
    <CardContent>
      <h1>Total number of ingredients: {tot_ingredients}</h1>
    </CardContent>
  );

  const num_recipes_card = (
    <CardContent>
      <h1>Number of recipes for these ingredients: {foundRecipes}</h1>
    </CardContent>
  );
  
  const recipe1 = (
    <Card>
      <CardHeader title={firstRecipe.name}/>
      <CardContent>
        <p>Name: {firstRecipe.name}</p>
        <p>Minutes: {firstRecipe.minutes}</p>
        <p>Ingredients: {firstRecipe.ingredients}</p>
        <p>Number of ingredients: {firstRecipe.n_ingredients}</p>
        <p>Cooking instructions: {firstRecipe.steps}</p>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <Router>
        <nav className="navbar">
          <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
          <Link to="/recipes">Recipe Generator</Link>
          <a
            href="https://github.com/alto10002"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link"
          >
            <AiFillLinkedin color="#ffc401" />
          </a>
          <a
            href="https://www.linkedin.com/in/jay-mangat/"
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
      <br />
      <h1>Recipe Generator</h1>
      <p>Enter ingredients here:</p>

      <Select
        defaultValue={[]}
        isMulti
        name="ingredients"
        options={ingredient_dropdown}
        onChange={(selected) => setSelectedOptions(selected)}
        className="basic-multi-select"
        classNamePrefix="select"
      />

      <Button variant="contained" onClick={submitIngredients}>
        Submit Ingredients
      </Button>
      <Card variant="outlined">{tot_recipes_card}</Card>
      <Card variant="outlined">{num_recipes_card}</Card>
      <Card variant="outlined">{recipe1}</Card>
    </div>
  );
}

export default App;

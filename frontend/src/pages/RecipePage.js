import { useState, useEffect } from "react";
import Select from "react-select";
import { Button, CardHeader, Card, CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import RecipeCard from "../components/RecipeCard";

function Recipes() {
  //javascript logic
  const [selected, setSelectedOptions] = useState([]);
  const [ingredient_dropdown, setIngreDropdown] = useState([]);
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [smallRecipeCount, setSmallRecipeCount] = useState([]);
  const [firstRecipe, setFirstRecipe] = useState([]);
  const [secondRecipe, setSecondRecipe] = useState([]);
  const [thirdRecipe, setThirdRecipe] = useState([]);

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
    setSecondRecipe(found_recipes[1]);
    setThirdRecipe(found_recipes[2]);
  };

  const searchSmallDataset = async (selected) => {
    const response = await fetch("http://localhost:8000/quick_ingredient_count_update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_ingredients: selected.map((opt) => opt.value),
      }),
    });

    const s = await response.json();
    setSmallRecipeCount(s);
  };

  const num_recipes_card = (
    <CardContent>
      <p>Number of available recipes: {smallRecipeCount}</p>
    </CardContent>
  );

  const handleIngredientChange = (selected) => {
    setSelectedOptions(selected);
    searchSmallDataset(selected);
  };

  return (
    //rendered to DOM
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <h1>Recipe Generator</h1>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <p>Enter ingredients here:</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <Select
            defaultValue={[]}
            isMulti
            name="ingredients"
            options={ingredient_dropdown}
            onChange={(selected) => handleIngredientChange(selected)}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={submitIngredients}>
            Submit Ingredients
          </Button>
        </Grid>
        <Grid item>
          <Card variant="outlined">{num_recipes_card}</Card>
        </Grid>
      </Grid>

      <Grid container>
        <RecipeCard recipe={firstRecipe} />
        <RecipeCard recipe={secondRecipe} />
        <RecipeCard recipe={thirdRecipe} />
      </Grid>
    </div>
  );
}

export default Recipes;

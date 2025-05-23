import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import AnimatedCount from "../components/AnimatedCount";
import RecipeCard from "../components/RecipeCard";
import { Grid, Typography, Button, Box, Fade } from "@mui/material";
import { getReactSelectStyles } from "../themes/reactSelectStyles";
import { useTheme } from "@mui/material/styles";  

function Recipes() {
  //javascript logic
  const [selected, setSelectedOptions] = useState([]);
  const [ingredient_dropdown, setIngreDropdown] = useState([]);
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [smallRecipeCount, setSmallRecipeCount] = useState(231637);
  const [firstRecipe, setFirstRecipe] = useState([]);
  const [secondRecipe, setSecondRecipe] = useState([]);
  const [thirdRecipe, setThirdRecipe] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [fadeTrigger, setFadeTrigger] = useState(false);
  const theme = useTheme();
  const customStyles = getReactSelectStyles(theme);

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

    setHasGenerated(true);
    setFadeTrigger(true);
    setTimeout(() => setFadeTrigger(true), 50);
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

  const handleIngredientChange = (selected) => {
    setSelectedOptions(selected);
    searchSmallDataset(selected);
  };

  return (
    <Box>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Typography variant="h2" align="center" sx={{ fontSize: "3rem", mt: 0, mb: 0 }}>
            Recipe Generator
          </Typography>

          <Typography variant="h6" align="center" sx={{ mt: 0 }}>
            Turn your pantry into a plate by creating a custom recipe from your own ingredients.
          </Typography>
        </Grid>

        <Grid container justifyContent="center" spacing={2}>
          <Grid>
            <Select
              defaultValue={[]}
              isMulti
              name="ingredients"
              options={ingredient_dropdown}
              onChange={(selected) => handleIngredientChange(selected)}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={ customStyles }
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={submitIngredients}>
              Generate
            </Button>
          </Grid>
        </Grid>

        <Grid item>
          <AnimatedCount count={smallRecipeCount} />
        </Grid>

        <Fade in={fadeTrigger} timeout={500}>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <RecipeCard recipe={firstRecipe} />
            </Grid>
            <Grid item>
              <RecipeCard recipe={secondRecipe} />
            </Grid>
            <Grid item>
              <RecipeCard recipe={thirdRecipe} />
            </Grid>
          </Grid>
        </Fade>
      </Grid>
    </Box>
  );
}

export default Recipes;

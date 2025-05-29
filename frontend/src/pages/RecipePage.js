import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import AnimatedCount from "../components/AnimatedCount";
import RecipeCard from "../components/RecipeCard";
import { Grid, Typography, Button, Box, Fade } from "@mui/material";
import { getReactSelectStyles } from "../themes/reactSelectStyles";
import { useTheme } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7, Palette } from "@mui/icons-material";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import LiquidBackground from '../components/LiquidBackground';

function RecipePage({ mode, setMode }) {
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
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";


  // Get list of ingredients from csv data file
  useEffect(() => {
    fetch(`${apiUrl}/ingredients`)
      .then((res) => res.json())
      .then((data) => setIngreDropdown(data))
      .catch((err) => console.error("Error fetching ingredients:", err));
  }, []);

  const searchSmallDataset = async (selected) => {
    const response = await fetch(`${apiUrl}/quick_ingredient_count_update`, {
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

  const submitIngredients = async () => {
    if (smallRecipeCount < 3) {
      alert("Please select at least 3 ingredients to generate recipes.");
      return;
    }

    setRecipeLoading(true); // Show loading screen immediately
    setFadeIn(false); // Reset fadeIn to hide new recipes
    setFadeOut(false); // Reset fadeOut in case of previous runs

    try {
      const response = await fetch(`${apiUrl}/generate_recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_ingredients: selected.map((opt) => opt.value),
        }),
      }).catch((err) => console.error("Error generating recipes:", err));

      const found_recipes = await response.json();

      // After fetching, hide loading screen and fade out old recipes
      setRecipeLoading(false);
      setFadeOut(true);

      // Wait for fade-out duration before updating and fading in new
      setTimeout(() => {
        setFirstRecipe(found_recipes[0]);
        setSecondRecipe(found_recipes[1]);
        setThirdRecipe(found_recipes[2]);
        setFadeOut(false);
        setFadeIn(true); // Fade in new recipes
        setHasGenerated(true);
      }, 500); // Match the fade-out duration
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setRecipeLoading(false);
      alert("An error occurred while generating recipes.");
    }
  };

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Box>
      <LiquidBackground />
      {recipeLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/loading.gif" height="100" />
        </Box>
      )}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          display: "flex",
          gap: 1.5,
          zIndex: 1300,
        }}
      >
        <Tooltip title="Home">
          <IconButton component={RouterLink} to="/" sx={{ color: theme.palette.accent.main }}>
            <FaHome size={24} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          display: "flex",
          gap: 1.5,
          zIndex: 1300,
        }}
      >
        <Tooltip title="Dark Mode">
          <IconButton
            onClick={() => setMode((prev) => (prev === "light" ? "dark" : "light"))}
            sx={{ color: theme.palette.accent.main }}
          >
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container direction="column">
        <Grid>
          <Typography variant="h2" align="center" sx={{ fontSize: "3rem", mt: 0, mb: 0 }}>
            Recipe Generator
          </Typography>

          <Typography variant="h6" align="center" sx={{ mt: 0 }}>
            Turn your pantry into a plate by creating a custom recipe from your own ingredients.
          </Typography>
        </Grid>

        <Grid container justifyContent="center" spacing={2}>
          <Grid>
            <Box
              sx={{
                borderRadius: 1,
                "&:hover": {
                  boxShadow: (theme) => `0 0 15px ${theme.palette.accent.main}`,
                },
              }}
            >
              <Select
                defaultValue={[]}
                isMulti
                name="ingredients"
                options={ingredient_dropdown}
                onChange={(selected) => searchSmallDataset(selected)}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customStyles}
              />
            </Box>
          </Grid>

          <Grid>
            <Button
              variant="contained"
              onClick={submitIngredients}
              sx={{
                "&:hover": {
                  boxShadow: (theme) => `0 0 15px ${theme.palette.accent.main}`,
                },
              }}
            >
              Generate
            </Button>
          </Grid>
        </Grid>

        <Grid>
          <AnimatedCount count={smallRecipeCount} />
        </Grid>
        <Fade in={!fadeOut && hasGenerated} timeout={500}>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid>
              <RecipeCard recipe={firstRecipe} />
            </Grid>
            <Grid>
              <RecipeCard recipe={secondRecipe} />
            </Grid>
            <Grid>
              <RecipeCard recipe={thirdRecipe} />
            </Grid>
          </Grid>
        </Fade>
      </Grid>

      <Box
        sx={{
          position: "fixed",
          bottom: 16, // Distance from the bottom of the screen
          left: "50%", // Start from horizontal center
          transform: "translateX(-50%)", // Shift it back by 50% of its width to center
          // zIndex: 1300, // Optional: ensure it stays on top of other content
          display: "flex", // Optional: use flex if you want content to be centered inside
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip title="LinkedIn">
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/jay-mangat/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.accent.main }}
          >
            <Typography>LinkedIn</Typography>
            <AiFillLinkedin size={24} />
          </IconButton>
        </Tooltip>

        <Typography>|</Typography>

        <Tooltip title="GitHub">
          <IconButton
            component="a"
            href="https://github.com/alto10002"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.accent.main }}
          >
            <Typography>Github</Typography>
            <AiFillGithub size={24} />
          </IconButton>
        </Tooltip>
      </Box>
      {/* <Box
        sx={{
          position: "fixed",
          justifyContent: "center", // center horizontally
          alignItems: "center",
          minHeight: '120vh',
          display: "flex",
          gap: 1.5,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            // Your actual load more logic here!
          }}
          sx={{
            color: theme.palette.accent.main,
            borderRadius: "999px", // makes it pill-shaped
            paddingX: 3, // horizontal padding
            paddingY: 1, // vertical padding
            textTransform: "none", // optional: keeps text normal case
          }}
        >
          Load More
        </Button>
      </Box> */}
    </Box>
  );
}

export default RecipePage;

import { Card, CardHeader, CardContent, CardMedia, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CgChevronDoubleDown, CgChevronDoubleUp } from "react-icons/cg";

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((prev) => !prev);

  return (
    <Card sx={{ width: 475, wordWrap: "break-word" }}>
      <CardMedia component="img" height="200" image="recipe.png" />
      <CardContent>
        <Typography variant="h5">{recipe.name}</Typography>
        <p>Prep time: {recipe.minutes}</p>
        <p>Total required ingredients: {recipe.n_ingredients}</p>

        <IconButton onClick={handleExpandClick} aria-label="expand card">
          {expanded ? <CgChevronDoubleUp size={24} /> : <CgChevronDoubleDown size={24} />}
        </IconButton>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="subtitle1">Ingredients:</Typography>
          {Array.isArray(recipe.ingredients) && (
            <ul>
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}

          <Typography variant="subtitle1">Cooking instructions:</Typography>
          {Array.isArray(recipe.steps) && (
            <ol>
              {recipe.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;

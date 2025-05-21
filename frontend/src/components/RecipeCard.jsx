import { Card, Box, CardContent, CardMedia, IconButton, CardActions } from "@mui/material";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { FaExternalLinkAlt } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((prev) => !prev);

  return (
    <Card sx={{ width: 475, wordWrap: "break-word" }}>
      <CardMedia component="img" height="200" image={recipe.image_url} />

      <CardContent>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            {recipe.name}
          </Typography>
          <IconButton href={recipe.page_url} target="_blank" rel="noopener noreferrer" size="small">
            <FaExternalLinkAlt />
          </IconButton>
        </Box>

        {/* Clickable area below the title */}
        <div onClick={handleExpandClick} style={{ cursor: "pointer", userSelect: "none" }}>
          <p>Prep time: {recipe.minutes} minutes</p>
          <p>Total required ingredients: {recipe.n_ingredients}</p>
          <p style={{ fontWeight: 500, textAlign: "center" }}>{expanded ? "Hide details ▲" : "Show details ▼"}</p>
        </div>

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

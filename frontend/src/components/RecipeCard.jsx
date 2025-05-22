import { Card, Box, CardContent, CardMedia, IconButton, CardActions } from "@mui/material";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { FaExternalLinkAlt } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((prev) => !prev);

  return (
    <Card sx={{ width: 475, wordWrap: "break-word", bgcolor: "primary.main" }}>
      <Box onClick={handleExpandClick} style={{ cursor: "pointer", userSelect: "none" }}>
        <CardMedia
          component="img"
          image={recipe.image_url}
          sx={{
            maxHeight: expanded ? 500 : 250,
            height: "auto",
            width: "100%",
            transition: "max-height 0.3s ease",
          }}
        />

        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              {recipe.name}
            </Typography>
            <IconButton href={recipe.page_url} target="_blank" rel="noopener noreferrer" size="small">
              <FaExternalLinkAlt />
            </IconButton>
          </Box>

          <p>
            <span style={{ fontWeight: "bold" }}>⌛Prep time:</span> {recipe.minutes} minutes
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>🔢Total required ingredients:</span> {recipe.n_ingredients} minutes
          </p>
          <p style={{ fontWeight: 500, textAlign: "center" }}>
            {expanded ? "Hide ingredients and instructions ▲" : "Show ingredients and instructions ▼"}
          </p>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
          <p style={{ fontWeight: "bold" }}>🥣Ingredients:</p>
            {Array.isArray(recipe.ingredients) && (
              <ul>
                {recipe.ingredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}

            <p style={{ fontWeight: "bold" }}>📋Cooking instructions:</p>
            {Array.isArray(recipe.steps) && (
              <ol>
                {recipe.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            )}
          </Collapse>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RecipeCard;

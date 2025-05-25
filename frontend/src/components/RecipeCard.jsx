import { useState, useEffect } from "react";
import { Box, Card, CardContent, CardMedia, Collapse, IconButton, List, ListItem, Typography } from "@mui/material";
import { FaExternalLinkAlt } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((prev) => !prev);

  return (
    <Card sx={{ width: 475, wordWrap: "break-word", bgcolor: "primary.main" }}>
      <Box onClick={handleExpandClick} sx={{ cursor: "pointer", userSelect: "none" }}>
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
            <IconButton
              href={recipe.page_url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: "accent.main" }}
            >
              <FaExternalLinkAlt />
            </IconButton>
          </Box>

          <Typography>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              ⌛Prep time:
            </Box>{" "}
            {recipe.minutes} minutes
          </Typography>

          <Typography>
            <Box component="span" sx={{ fontWeight: "bold" }}>
              🔢Total required ingredients:
            </Box>{" "}
            {recipe.n_ingredients}
          </Typography>

          <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
            {expanded ? "Hide ingredients and instructions ▲" : "Show ingredients and instructions ▼"}
          </Typography>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography sx={{ fontWeight: "bold" }}>🥣Ingredients:</Typography>
            {Array.isArray(recipe.ingredients) && (
              <List dense sx={{ listStyleType: "disc", listStylePosition: "inside", pl: 0.3 }}>
                {recipe.ingredients.map((item, idx) => (
                  <ListItem key={idx} sx={{ display: "list-item" }}>
                    {item}
                  </ListItem>
                ))}
              </List>
            )}
            <Typography sx={{ fontWeight: "bold" }}>📋Cooking instructions:</Typography>
            {Array.isArray(recipe.steps) && (
              <List component="ol" sx={{ listStyleType: "decimal", pl: 4 }}>
                {recipe.steps.map((step, idx) => (
                  <ListItem key={idx} sx={{ display: "list-item" }}>
                    {step}
                  </ListItem>
                ))}
              </List>
            )}
          </Collapse>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RecipeCard;

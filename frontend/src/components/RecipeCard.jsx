import { Card, CardHeader, CardContent } from "@mui/material";
import Typography from '@mui/material/Typography';

const RecipeCard = ({ recipe }) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.name}
        </Typography>
        <p>Minutes: {recipe.minutes}</p>
        <p>Ingredients: {recipe.ingredients}</p>
        <p>Number of ingredients: {recipe.n_ingredients}</p>
        <p>Cooking instructions: {recipe.steps}</p>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;

import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from 'react-router-dom';

const HomePageButton = ({ linkto, children}) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      component={Link}
      to={linkto}
      sx={{
        backgroundColor: theme.palette.homepage.button, 
        color: theme.palette.homepage.text, 
        "&:hover": {
          backgroundColor: theme.palette.homepage.button2,
          color: theme.palette.homepage.text, 
        },
      }}
    >
      {children}
      </Button>
  );
};

export default HomePageButton;

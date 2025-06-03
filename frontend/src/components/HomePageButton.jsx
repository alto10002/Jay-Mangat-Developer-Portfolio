import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const HomePageButton = ({ linkto, children }) => {
  const theme = useTheme();
  return (
    <Button
      title="The servers can take up to a minute to spin up"
      variant="contained"
      component="a"
      href={linkto}
      target="_blank"
      rel="noopener noreferrer"
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

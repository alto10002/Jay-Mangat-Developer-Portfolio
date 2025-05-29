import LiquidBackground from "../components/LiquidBackground";
import { Box, Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const FadeInSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
    >
      {children}
    </motion.div>
  );
};

function HomePage() {
  const theme = useTheme();
  return (
    <>
      <LiquidBackground /> {/* Background fixed behind everything */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1, // Ensure content is above background
          minHeight: "100vh", // Ensure content fills viewport
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ height: "200vh", padding: "2rem" }}>
          <FadeInSection>
            <Typography variant="h1" color="theme.palette.text.primary">
              Hi. I'm Jay and here's where I showcase some of my projects.
            </Typography>
          </FadeInSection>
          <FadeInSection>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
              <Card
                sx={{
                  display: "flex",
                  width: "75vw", // Span 75% of the viewport width
                  maxHeight: 300, // Optional: control max height
                }}
              >
                {/* Left Side: Image */}
                <CardMedia
                  component="img"
                  sx={{ width: "40%", objectFit: "cover" }}
                  image="/recipes-thumbnail.png"
                  alt="Recipe Project"
                />

                {/* Right Side: Text and Button */}
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 , color:'text.card'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h4">
                      What's in your pantry?
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Searches a dataset of over 200,000 recipes to find one that fits all your selected ingredients. Based
                      on these recipes you will be able to see the cooking time, number of total ingredients required,
                      and cooking instructions for each recipe. The generator also procedurally retrieves an image for each
                      recipe and links to a site hosting the recipe.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: "auto", ml: 2 }}>
                    <Button variant="contained" component={Link} to="/recipes">
                      View Project
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Box>
          </FadeInSection>
          <FadeInSection>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
              <Card
                sx={{
                  display: "flex",
                  width: "75vw", // Span 75% of the viewport width
                  maxHeight: 300, // Optional: control max height
                }}
              >
                {/* Left Side: Image */}
                <CardMedia
                  component="img"
                  sx={{ width: "40%", objectFit: "cover" }}
                  image="/aqi_dashboard_thumbnail.png"
                  alt="Dashboard Project"
                />

                {/* Right Side: Text and Button */}
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, color:'text.card'}}>
                  <CardContent>
                    <Typography gutterBottom variant="h4">
                      Air Quality Index Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      A dashboard that displays the air quality index for various Indian cities. 
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: "auto", ml: 2 }}>
                    <Button variant="contained" component={Link} to="https://dsci-532-2025-23-aqi-dashboard.onrender.com/">
                      View Project
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Box>
          </FadeInSection>
        </div>
      </Box>
    </>
  );
}

export default HomePage;

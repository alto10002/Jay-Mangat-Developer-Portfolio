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
          {/* 
          <div style={{ height: "100vh" }}></div>
          <FadeInSection>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                textAlign: "center",
              }}
            >
              <Typography variant="h2" gutterBottom>
                Welcome to My Project!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Check out my recipe generator project.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/recipes">
                View Recipes Project
              </Button>
            </Box>
          </FadeInSection>
          <div style={{ height: "100vh" }}></div>
          <FadeInSection>
            <Typography variant="h1" color="theme.palette.text.primary">
              C
            </Typography>
          </FadeInSection>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ textAlign: "center", marginTop: "50vh" }}
            >
              <h2>My Project: Recipe Generator</h2>
              <p>Generate custom recipes from your ingredients!</p>
              <Link to="/recipes">View Recipes Project</Link>
            </motion.div>
          </div>
           */}
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
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h4">
                      Recipe Generator
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Searches a dataset of 200,000 recipes to find one that fits all your selected ingredients. Based on
                      these recipes you will be able to see the cooking time, number of total ingredients required, and
                      cooking instructions for each recipe. The generator also procedurally gets an image for each
                      recipe and links to a site which hosts the recipe.
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
        </div>
      </Box>
    </>
  );
}

export default HomePage;

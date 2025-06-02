import ChipBadge from "../components/ChipBadge";
import { Box, Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaAws, FaReact, FaHtml5, FaPython } from "react-icons/fa";
import { SiRender, SiPlotly } from "react-icons/si";
import { IoLogoVercel, IoLogoJavascript } from "react-icons/io5";

const FadeInSection = ({ children, delay = 0 }) => {
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
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
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url('homepage_background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "2rem" }}>
          <Typography variant="h1" color="homepage.text">
            <TypeAnimation
              sequence={["Hi. ", 2000, "Hi. I'm Jay and here's where I showcase some of my projects."]}
              wrapper="span"
              speed={50}
              cursor={false}
            />
          </Typography>
          <FadeInSection delay={6}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
              <Card
                sx={{
                  display: "flex",
                  width: "75vw",
                  minHeight: 200,
                  backgroundColor: theme.palette.homepage.card,
                  borderRadius: 4,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: "40%", objectFit: "cover" }}
                  image="/recipes-thumbnail.png"
                  alt="Recipe Project"
                />

                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <CardContent>
                    <Typography variant="h4" color="homepage.text">
                      What's in your pantry?
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <ChipBadge label="Python" icon={FaPython} bgColor="#3d98ff" textAndIconColor="#000000" />
                      <ChipBadge label="React" icon={FaReact} bgColor="#0081A3" textAndIconColor="#000000" />
                      <ChipBadge label="S3" icon={FaAws} bgColor="#FF9900" textAndIconColor="#000000" />
                      <ChipBadge label="Render" icon={SiRender} bgColor="#a600ff" textAndIconColor="#000000" />
                      <ChipBadge label="Vercel" icon={IoLogoVercel} bgColor="#000000" textAndIconColor="#ffffff" />
                      <ChipBadge
                        label="JavaScript"
                        icon={IoLogoJavascript}
                        bgColor="#fff200"
                        textAndIconColor="#000000"
                      />
                      <ChipBadge label="HTML" icon={FaHtml5} bgColor="#ffb53d" textAndIconColor="#000000" />
                    </Box>
                    <Typography variant="body1" color="homepage.text">
                      Searches a dataset of over 200,000 recipes to find one that fits all your selected ingredients.
                      Based on these recipes you will be able to see the cooking time, number of total ingredients
                      required, and cooking instructions for each recipe. The generator also procedurally retrieves an
                      image for each recipe and links to a site hosting the recipe.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: "auto", ml: 2 }}>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/recipes"
                      sx={{
                        backgroundColor: theme.palette.homepage.button, // ✅ Background color from theme
                        color: theme.palette.homepage.text, // 🔥 Text color from theme
                        "&:hover": {
                          backgroundColor: theme.palette.homepage.button2, // Optional: hover background
                          color: theme.palette.homepage.text, // Optional: hover text
                        },
                      }}
                    >
                      Try it out!
                    </Button>
                    <Button
                      variant="contained"
                      component={Link}
                      to="https://dsci-532-2025-23-aqi-dashboard.onrender.com/"
                      sx={{
                        backgroundColor: theme.palette.homepage.button, // ✅ Background color from theme
                        color: theme.palette.homepage.text, // 🔥 Text color from theme
                        "&:hover": {
                          backgroundColor: theme.palette.homepage.button2, // Optional: hover background
                          color: theme.palette.homepage.text, // Optional: hover text
                        },
                      }}
                    >
                      Watch a demo!
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Box>
          </FadeInSection>

          <FadeInSection delay={8}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <Card
                sx={{
                  display: "flex",
                  width: "75vw",
                  minHeight: 200,
                  backgroundColor: theme.palette.homepage.card,
                  borderRadius: 4,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: "40%", objectFit: "cover" }}
                  image="/aqi_dashboard_thumbnail.png"
                  alt="Dashboard Project"
                />

                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, color: "homepage.card" }}>
                  <CardContent>
                    <Typography variant="h4" color="homepage.text">
                      Air Quality Index Dashboard
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <ChipBadge label="Dash" icon={SiPlotly} bgColor="#FF2C6D" textAndIconColor="#000000" />
                      <ChipBadge label="Python" icon={FaPython} bgColor="#3d98ff" textAndIconColor="#000000" />
                    </Box>
                    <Typography variant="body1" color="homepage.text">
                      A dashboard that displays the air quality index for various Indian cities.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: "auto", ml: 2 }}>
                    <Button
                      variant="contained"
                      component={Link}
                      to="https://dsci-532-2025-23-aqi-dashboard.onrender.com/"
                      sx={{
                        backgroundColor: theme.palette.homepage.button, // ✅ Background color from theme
                        color: theme.palette.homepage.text, // 🔥 Text color from theme
                        "&:hover": {
                          backgroundColor: theme.palette.homepage.button2, // Optional: hover background
                          color: theme.palette.homepage.text, // Optional: hover text
                        },
                      }}
                    >
                      Try it out!
                    </Button>
                    <Button
                      variant="contained"
                      component={Link}
                      to="https://dsci-532-2025-23-aqi-dashboard.onrender.com/"
                      sx={{
                        backgroundColor: theme.palette.homepage.button, // ✅ Background color from theme
                        color: theme.palette.homepage.text, // 🔥 Text color from theme
                        "&:hover": {
                          backgroundColor: theme.palette.homepage.button2, // Optional: hover background
                          color: theme.palette.homepage.text, // Optional: hover text
                        },
                      }}
                    >
                      Watch a demo!
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

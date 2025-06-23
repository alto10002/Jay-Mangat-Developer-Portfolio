import ChipBadge from "../components/ChipBadge";
import { Box, Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaAws, FaReact, FaHtml5, FaPython } from "react-icons/fa";
import { SiRender, SiPlotly } from "react-icons/si";
import { IoLogoVercel, IoLogoJavascript } from "react-icons/io5";
import HomePageButton from "../components/HomePageButton";
import VideoModal from "../components/VideoModal";
import canvasDots from "../components/heroCanvas";

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
  useEffect(() => {
    // Trigger warmup ping
    fetch("https://react-recipes-u4yt.onrender.com/ping")
      .then((res) => console.log("Ping successful:", res.status))
      .catch((err) => console.warn("Ping failed:", err));
  }, []);

  useEffect(() => {
    document.title = "JM | Portfolio";
    canvasDots();
  }, []);
  const theme = useTheme();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [hoveredRecipes, setHoveredRecipes] = useState(false);
  const [hoveredAQI, setHoveredAQI] = useState(false);
  const [hoveredTrends, setHoveredTrends] = useState(false);

  return (
    <>
      <canvas
        id="dotsCanvas"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 0,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "2rem" }}>
          <Typography variant="h1" color="homepage.text">
            <TypeAnimation
              sequence={["Hi. ", 2000, "Hi. I'm Jay and here's an up-to-date look on what I'm working on."]}
              wrapper="span"
              speed={50}
              cursor={false}
            />
          </Typography>
          <br />
          <FadeInSection delay={6}>
            <Typography variant="h2" color="homepage.text">
              Projects
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10, gap: 4 }}>
              {/* Recipes Card */}
              <a
                href="https://jay-mangat.vercel.app/recipes"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 200,
                    backgroundColor: theme.palette.homepage.card,
                    borderRadius: 4,
                  }}
                  onMouseEnter={() => setHoveredRecipes(true)}
                  onMouseLeave={() => setHoveredRecipes(false)}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 0,
                      paddingTop: "56.25%",
                    }}
                  >
                    {!hoveredRecipes ? (
                      <CardMedia
                        component="img"
                        image="/recipes-thumbnail.png"
                        alt="Recipe Project"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <video
                        src="/recipe_page_video.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </Box>
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
                  </Box>
                </Card>
              </a>
              {/* AQI Card */}
              <a
                href="https://dsci-532-2025-23-aqi-dashboard.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 200,
                    backgroundColor: theme.palette.homepage.card,
                    borderRadius: 4,
                  }}
                  onMouseEnter={() => setHoveredAQI(true)}
                  onMouseLeave={() => setHoveredAQI(false)}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 0,
                      paddingTop: "56.25%" /* 16:9 aspect ratio */,
                    }}
                  >
                    {!hoveredAQI ? (
                      <CardMedia
                        component="img"
                        image="/aqi_dashboard_thumbnail.png"
                        alt="Recipe Project"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <video
                        src="/aqi_dashboard_video.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", flex: 1, color: "homepage.card" }}>
                    <CardContent>
                      <Typography variant="h4" color="homepage.text">
                        Air Quality Index Dashboard
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <ChipBadge label="Dash" icon={SiPlotly} bgColor="#FF2C6D" textAndIconColor="#000000" />
                        <ChipBadge label="Python" icon={FaPython} bgColor="#3d98ff" textAndIconColor="#000000" />
                        <ChipBadge label="Render" icon={SiRender} bgColor="#a600ff" textAndIconColor="#000000" />
                      </Box>
                      <Typography variant="body1" color="homepage.text">
                        A dashboard that displays the air quality index for various Indian cities. Built using python
                        and dash, it shows the AQI levels for 5 Indian cities and presents various other gas levels for
                        those cities. All plotting elements are connected to the sidebar and cities can be selected via
                        clicking on them in the sidebar map.
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </a>
              {/* Youtube Trends Card */}
              <a
                href="https://jay-mangat.vercel.app/youtube_trends"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    // width: "75vw",
                    flexDirection: "column", // vertical layout
                    minHeight: 200,
                    backgroundColor: theme.palette.homepage.card,
                    borderRadius: 4,
                  }}
                  onMouseEnter={() => setHoveredTrends(true)}
                  onMouseLeave={() => setHoveredTrends(false)}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 0,
                      paddingTop: "56.25%" /* 16:9 aspect ratio */,
                    }}
                  >
                    {!hoveredTrends ? (
                      <CardMedia
                        component="img"
                        image="/aqi_dashboard_thumbnail.png"
                        alt="Recipe Project"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <video
                        src="/aqi_dashboard_video.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", flex: 1, color: "homepage.card" }}>
                    <CardContent>
                      <Typography variant="h4" color="homepage.text">
                        Youtube Trend Analyzer
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {/* <ChipBadge label="Dash" icon={SiPlotly} bgColor="#FF2C6D" textAndIconColor="#000000" />
                          <ChipBadge label="Python" icon={FaPython} bgColor="#3d98ff" textAndIconColor="#000000" />
                          <ChipBadge label="Render" icon={SiRender} bgColor="#a600ff" textAndIconColor="#000000" /> */}
                      </Box>
                      <Typography variant="body1" color="homepage.text">
                        App that shows some stuff about trending videos on youtube
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </a>
            </Box>
          </FadeInSection>
          <FadeInSection delay={6}>
            <Box>Add reports here</Box>
          </FadeInSection>
        </div>
      </Box>
    </>
  );
}

export default HomePage;

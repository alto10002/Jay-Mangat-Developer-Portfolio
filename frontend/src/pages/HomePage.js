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
import { Glow, GlowCapture } from "@codaworks/react-glow";
import HomePageButton from "../components/HomePageButton";
import VideoModal from "../components/VideoModal";

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
    document.title = "JM | Portfolio";
  }, []);
  const theme = useTheme();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);

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
          <GlowCapture>
            <Glow color="yellow">
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
                          Searches a dataset of over 200,000 recipes to find one that fits all your selected
                          ingredients. Based on these recipes you will be able to see the cooking time, number of total
                          ingredients required, and cooking instructions for each recipe. The generator also
                          procedurally retrieves an image for each recipe and links to a site hosting the recipe.
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ mt: "auto", ml: 2 }}>
                        <HomePageButton linkto="/recipes">Try it out!</HomePageButton>
                        <Button
                          variant="contained"
                          component="a"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenModal1(true)}
                          sx={{
                            backgroundColor: theme.palette.homepage.button,
                            color: theme.palette.homepage.text,
                            "&:hover": {
                              backgroundColor: theme.palette.homepage.button2,
                              color: theme.palette.homepage.text,
                            },
                          }}
                        >
                          Watch a demo!
                        </Button>
                        <VideoModal
                          open={openModal1}
                          handleClose={() => setOpenModal1(false)}
                          videoSrc="/recipe_page_video.mp4"
                        />
                      </CardActions>
                    </Box>
                  </Card>
                </Box>
              </FadeInSection>
            </Glow>
            <Glow>
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
                          <ChipBadge label="Render" icon={SiRender} bgColor="#a600ff" textAndIconColor="#000000" />
                        </Box>
                        <Typography variant="body1" color="homepage.text">
                          A dashboard that displays the air quality index for various Indian cities. Built using python
                          and dash, it shows the AQI levels for 5 Indian cities and presents various other gas levels
                          for those cities. All plotting elements are connected to the sidebar and cities can be
                          selected via clicking on them in the sidebar map.
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ mt: "auto", ml: 2 }}>
                        <HomePageButton linkto="https://dsci-532-2025-23-aqi-dashboard.onrender.com/">
                          Try it out!
                        </HomePageButton>
                        <Button
                          variant="contained"
                          component="a"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenModal2(true)}
                          sx={{
                            backgroundColor: theme.palette.homepage.button,
                            color: theme.palette.homepage.text,
                            "&:hover": {
                              backgroundColor: theme.palette.homepage.button2,
                              color: theme.palette.homepage.text,
                            },
                          }}
                        >
                          Watch a demo!
                        </Button>
                        <VideoModal
                          open={openModal2}
                          handleClose={() => setOpenModal2(false)}
                          videoSrc="/aqi_dashboard_video.mp4"
                        />
                      </CardActions>
                    </Box>
                  </Card>
                </Box>
              </FadeInSection>
            </Glow>
            <Glow>
              <FadeInSection delay={10}>
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
                      image="/youtube_trend_thumbnail.png"
                      alt="Trend Project"
                    />

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
                      <CardActions sx={{ mt: "auto", ml: 2 }}>
                        <HomePageButton linkto="\youtube_trends">Try it out!</HomePageButton>
                        <Button
                          variant="contained"
                          component="a"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenModal3(true)}
                          sx={{
                            backgroundColor: theme.palette.homepage.button,
                            color: theme.palette.homepage.text,
                            "&:hover": {
                              backgroundColor: theme.palette.homepage.button2,
                              color: theme.palette.homepage.text,
                            },
                          }}
                        >
                          Watch a demo!
                        </Button>
                        <VideoModal
                          open={openModal3}
                          handleClose={() => setOpenModal3(false)}
                          videoSrc="/aqi_dashboard_video.mp4"
                        />
                      </CardActions>
                    </Box>
                  </Card>
                </Box>
              </FadeInSection>
            </Glow>
          </GlowCapture>
        </div>
      </Box>
    </>
  );
}

export default HomePage;

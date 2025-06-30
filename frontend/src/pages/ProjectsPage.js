import ChipBadge from "../components/ChipBadge";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { FaAws, FaReact, FaHtml5, FaPython, FaCog, FaGithub } from "react-icons/fa";
import { SiRender, SiPlotly } from "react-icons/si";
import { DiPostgresql } from "react-icons/di";
import { IoLogoVercel, IoLogoJavascript } from "react-icons/io5";
import canvasDots from "../components/heroCanvas";
import { TbSql } from "react-icons/tb";

function ProjectsPage() {
  useEffect(() => {
    document.title = "JM | Projects";
    canvasDots(["rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)"], "rgb(0, 0, 0)");
  }, []);

  const theme = useTheme();
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
          zIndex: 1,
          pointerEvents: "none",
          backgroundColor: "#c74a42",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ padding: "2rem", width: "100%", }}>
          <Typography variant="h1" color="black" textAlign="center">
            Projects
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
              mt: 10,
            }}
          >
            {[
              {
                title: "Youtube Trend Analyzer",
                href: "https://jay-mangat.vercel.app/youtube_trends",
                thumbnail: "/youtube_trends_thumbnail.png",
                video: "/youtube_trends_video.mp4",
                hovered: hoveredTrends,
                setHovered: setHoveredTrends,
                tech: [
                  { label: "SQL", icon: TbSql, bg: "#0790a2", fg: "#000" },
                  { label: "ETL", icon: FaCog, bg: "#d3a84a", fg: "#000" },
                  { label: "CI/CD", icon: FaGithub, bg: "#FFF", fg: "#000" },
                  { label: "Postgres", icon: DiPostgresql, bg: "#0064a5", fg: "#000" },
                  { label: "React", icon: FaReact, bg: "#0081A3", fg: "#000" },
                  { label: "Python", icon: FaPython, bg: "#3d98ff", fg: "#000" },
                ],
                description:
                  "End-to-end ETL pipeline that begins with daily calls to Youtube's API to collect data on trending videos, cleans and uploads this data to a postgres database, then SQL query's into the database using user provided filters, and provides the results in an interactive dashboard.",
              },
              {
                title: "What's in your pantry?",
                href: "https://jay-mangat.vercel.app/recipes",
                thumbnail: "/recipes-thumbnail.png",
                video: "/recipe_page_video.mp4",
                hovered: hoveredRecipes,
                setHovered: setHoveredRecipes,
                tech: [
                  { label: "Python", icon: FaPython, bg: "#3d98ff", fg: "#000" },
                  { label: "React", icon: FaReact, bg: "#0081A3", fg: "#000" },
                  { label: "S3", icon: FaAws, bg: "#FF9900", fg: "#000" },
                  { label: "Render", icon: SiRender, bg: "#a600ff", fg: "#000" },
                  { label: "Vercel", icon: IoLogoVercel, bg: "#000", fg: "#fff" },
                  { label: "JavaScript", icon: IoLogoJavascript, bg: "#fff200", fg: "#000" },
                  { label: "HTML", icon: FaHtml5, bg: "#ffb53d", fg: "#000" },
                ],
                description:
                  "Searches a dataset of over 200,000 recipes to find one that fits all your selected ingredients. Based on these recipes you will be able to see the cooking time, number of total ingredients required, and cooking instructions for each recipe.",
              },
              {
                title: "Air Quality Index Dashboard",
                href: "https://dsci-532-2025-23-aqi-dashboard.onrender.com/",
                thumbnail: "/aqi_dashboard_thumbnail.png",
                video: "/aqi_dashboard_video.mp4",
                hovered: hoveredAQI,
                setHovered: setHoveredAQI,
                tech: [
                  { label: "Dash", icon: SiPlotly, bg: "#FF2C6D", fg: "#000" },
                  { label: "Python", icon: FaPython, bg: "#3d98ff", fg: "#000" },
                  { label: "Render", icon: SiRender, bg: "#a600ff", fg: "#000" },
                ],
                description:
                  "Displays the air quality index for Indian cities using Dash. Interactive map and sidebar allow users to explore gas levels and AQI data.",
              },
            ].map((card, i) => (
              <a
                key={i}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", flex: "1 1 calc(50% - 2rem)", minWidth: "280px" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    backgroundColor: theme.palette.homepage.card,
                    borderRadius: 4,
                  }}
                  onMouseEnter={() => card.setHovered(true)}
                  onMouseLeave={() => card.setHovered(false)}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 0,
                      paddingTop: "56.25%",
                    }}
                  >
                    {!card.hovered ? (
                      <CardMedia
                        component="img"
                        image={card.thumbnail}
                        alt={card.title}
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
                        src={card.video}
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
                        {card.title}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                        {card.tech.map((chip, idx) => (
                          <ChipBadge
                            key={idx}
                            label={chip.label}
                            icon={chip.icon}
                            bgColor={chip.bg}
                            textAndIconColor={chip.fg}
                          />
                        ))}
                      </Box>
                      <Typography variant="body1" color="homepage.text" mt={1}>
                        {card.description}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </a>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProjectsPage;

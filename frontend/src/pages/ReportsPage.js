import ChipBadge from "../components/ChipBadge";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaAws, FaReact, FaHtml5, FaPython } from "react-icons/fa";
import { SiRender, SiPlotly } from "react-icons/si";
import { IoLogoVercel, IoLogoJavascript } from "react-icons/io5";
import canvasDots from "../components/heroCanvas";

function ReportsPage() {
  useEffect(() => {
    document.title = "JM | Reports";
    canvasDots(["rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)"], "rgb(0, 0, 0)");
  }, []);

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
          backgroundColor: "#424fc7",
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
        }}
      >
        <div style={{ padding: "2rem" }}>
          <Typography variant="h1" color="black">
            Reports
          </Typography>
          {/* Reports box */}
          <Box
            sx={{
              width: "80vh",
            }}
          >
            test
          </Box>
        </div>
      </Box>
    </>
  );
}

export default ReportsPage;

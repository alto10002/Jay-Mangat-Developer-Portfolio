import { Box, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef, useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import canvasDots from "../components/heroCanvas";
import AnimatedButton from "../components/AnimatedButton";

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
  // const hasAnimatedRef = useRef(false); // stays persistent across rerenders
  // const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    document.title = "JM | Portfolio";
    canvasDots(
      ["rgb(48, 158, 255)", "rgb(48, 158, 255)", "rgb(48, 158, 255)", "rgb(48, 158, 255)", "rgb(255, 36, 51)"],
      "rgb(48, 158, 255)"
    );

    // if (!hasAnimatedRef.current) {
    //   setShouldAnimate(true);
    //   hasAnimatedRef.current = true;
    // }

    // Trigger warmup ping
    console.log("Ping sent from home page")
    fetch("https://react-recipes-u4yt.onrender.com/ping")
      .then((res) => console.log("Homepage ping successful:", res.status))
      .catch((err) => console.warn("Homepage ping failed:", err));

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
          backgroundColor: "black",
          // backgroundColor: theme.palette.homepage.background,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            // flex: "0 0 33%", // 25% height
            display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            px: 4,
            pt: 20,
          }}
        >
          <Typography variant="h1" color="homepage.text" textAlign="left">
            <TypeAnimation
              sequence={["Hi. ", 2000, "Hi. I'm Jay and here's an up-to-date look on what I'm working on."]}
              wrapper="span"
              speed={50}
              cursor={false}
            />
          </Typography>
        </Box>

        <Box
          sx={{
            // flex: "1",
            mt: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FadeInSection delay={6}>
            <Box sx={{ display: "flex", gap: 10 }}>
              <AnimatedButton iconSrc="/blob1.svg" pageLink={"/projects"} color="#c74a42">
                Projects
              </AnimatedButton>
              <AnimatedButton iconSrc="/blob2.svg" pageLink={"/reports"} color="#424fc7">
                Reports
              </AnimatedButton>
            </Box>
          </FadeInSection>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;

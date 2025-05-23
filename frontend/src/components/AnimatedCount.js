import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Grid, Typography, Button, Box, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";


function AnimatedCount({ count }) {
  const [animatedValue, setAnimatedValue] = useState(count);
  const [yOffset, setYOffset] = useState(0);
  const prevCount = useRef(count);
  const theme = useTheme();
  const [color, setColor] = useState(theme.palette.text.primary);

  useEffect(() => {
    // Set animation direction
    const isIncreasing = count > prevCount.current;
    setColor(isIncreasing ? "green" : "red");
    setYOffset(isIncreasing ? -5 : 5);

    // Smoothly animate value using framer's animate() utility
    const controls = animate(prevCount.current, count, {
      duration: 0.5,
      onUpdate: (val) => setAnimatedValue(Math.round(val)),
    });

    // Reset visual effects after animation
    const timeout = setTimeout(() => {
      setColor(theme.palette.text.accent);
      setYOffset(0);
    }, 500);

    prevCount.current = count;

    return () => {
      controls.stop();
      clearTimeout(timeout);
    };
  }, [count]);

  return (
    <Typography sx={{textAlign:'center'}}>
      Number of available recipes:{" "}
      <motion.span
        animate={{ color, y: yOffset }}
        transition={{ duration: 1 }}
        style={{ display: "inline-block" }}
      >
        {animatedValue}
      </motion.span>
    </Typography>
  );
}


export default AnimatedCount;

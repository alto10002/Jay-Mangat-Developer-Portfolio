import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedCount({ count }) {
  const [animatedValue, setAnimatedValue] = useState(count);
  const [color, setColor] = useState("black");
  const [yOffset, setYOffset] = useState(0);
  const prevCount = useRef(count);

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
      setColor("black");
      setYOffset(0);
    }, 500);

    prevCount.current = count;

    return () => {
      controls.stop();
      clearTimeout(timeout);
    };
  }, [count]);

  return (
    <p style={{ fontSize: "1.1rem", textAlign: "center" }}>
      Number of available recipes:{" "}
      <motion.span
        animate={{ color, y: yOffset }}
        transition={{ duration: 1 }}
        style={{ display: "inline-block" }}
      >
        {animatedValue}
      </motion.span>
    </p>
  );
}


export default AnimatedCount;

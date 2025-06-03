import React, { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

// Generate a random animation for movement
const generateRandomKeyframes = () => {
  const x1 = Math.random() * 100;
  const y1 = Math.random() * 100;
  const x2 = Math.random() * 100;
  const y2 = Math.random() * 100;
  return keyframes`
    0% { transform: translate(${x1}vw, ${y1}vh); }
    50% { transform: translate(${x2}vw, ${y2}vh); }
    100% { transform: translate(${x1}vw, ${y1}vh); }
  `;
};

const FoodItems = ({ image, altText }) => {
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    setAnimation(generateRandomKeyframes());
  }, []);

  if (!animation) return null;

  return (
    <Box
      component="img"
      src={image}
      alt={altText}
      sx={{
        width: 175,
        height: "auto",
        animation: `${animation} 60s linear infinite`,
        position: "absolute",
        zIndex: -1,
      }}
    />
  );
};

export default FoodItems;

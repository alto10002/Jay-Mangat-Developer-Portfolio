import { Box, Button } from "@mui/material";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AnimatedButton({ children, iconSrc, pageLink, color, size = 40 }) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [circleStyle, setCircleStyle] = useState(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setCircleStyle({
      top: centerY,
      left: centerX,
    });

    setClicked(true);

    // Navigate after animation finishes (e.g., 700ms)
    setTimeout(() => {
      navigate(pageLink);
    }, 700);
  };

  return (
    <>
      {/* Expanding circle overlay */}
      {clicked && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw", // ✅ full-screen canvas
            height: "100vh",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: circleStyle?.top ?? 0,
              left: circleStyle?.left ?? 0,
              width: 0,
              height: 0,
              backgroundColor: color,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              animation: "expandCircle 1s ease-out forwards",
            }}
          />
        </Box>
      )}

      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          position: "relative",
          display: "inline-block",
          borderRadius: 0,
          overflow: "hidden",
        }}
      >
        <Button
          ref={buttonRef}
          onClick={handleClick}
          variant="contained"
          sx={{
            width: 200,
            height: 50,
            borderRadius: 0,
            border: "3px solid white",
            backgroundColor: "grey",
            fontSize: "1.5rem",
            padding: 0,
            position: "relative",
            color: "white",
          }}
        >
          {/* Expanding blob inside button */}
          <Box
            component="img"
            src={iconSrc}
            alt="spinner"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: size,
              height: size,
              transform: hover ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0)",
              transition: "transform 0.4s ease-in-out",
              animation: hover ? "spin 4s linear infinite" : "none",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* Text content */}
          <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
        </Button>
      </Box>
    </>
  );
}

export default AnimatedButton;

import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const WelcomeModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.default",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="body1" gutterBottom>
          The ingredients list can take up to a minute to populate. Please be patient!
        </Typography>
        <Button variant="contained" onClick={handleClose}>
          Got it
        </Button>
      </Box>
    </Modal>
  );
};

export default WelcomeModal;

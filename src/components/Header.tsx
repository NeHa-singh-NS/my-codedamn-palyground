import React from "react";
import { Box, Typography } from "@mui/material";

const HeaderBar = () => {
  const headerStyles = {
    background:
      "linear-gradient(155.1deg, rgba(55, 55, 55, 1) 5.48%, rgba(93, 89, 89, 0.1) 100%)",
    height: "50px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    zIndex: 1000,
  };

  return (
    <Box sx={headerStyles}>
      <Typography ml={2} variant="h6" color="primary">
        My Codedamn Playground
      </Typography>
    </Box>
  );
};

export default HeaderBar;

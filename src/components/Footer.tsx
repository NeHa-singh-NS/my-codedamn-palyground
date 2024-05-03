import { Box, Typography } from "@mui/material";
import React from "react";

interface FooterProps {
  themeMode?: "light" | "dark";
}

const Footer: React.FC<FooterProps> = ({ themeMode }) => {
  const footerStyle: React.CSSProperties = {
    background:
      themeMode === "light"
        ? "linear-gradient(to bottom, #fff, #ccc)"
        : "linear-gradient(to bottom, #333, #2b2b2b)",

    color: themeMode === "light" ? "#988" : "#EEEEEE",
    padding: "2px 0",
    marginTop: "auto",
    textAlign: "center",
    position: "sticky",
    bottom: "0",
    zIndex: 1000,
  };

  return (
    <footer style={footerStyle}>
      <Box>
        <Typography variant="caption">
          &copy; 2024 codedamn Playground
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;

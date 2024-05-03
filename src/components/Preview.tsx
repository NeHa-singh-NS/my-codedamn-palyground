"use client";
import React from "react";
import { Box } from "@mui/material";
import { Resizable } from "re-resizable";

interface PreviewProps {
  output: string;
}
const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#333",
};
const Preview: React.FC<PreviewProps> = ({ output }) => {
  return (
    <Resizable
      style={style}
      defaultSize={{
        width: "auto",
        height: 400,
      }}
    >
      <Box dangerouslySetInnerHTML={{ __html: output }} />
    </Resizable>
  );
};

export default Preview;

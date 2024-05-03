"use client";
import { Box } from "@mui/material";
import React from "react";

interface File {
  name: string;
  content: string;
}

interface FileExplorerProps {
  files: File[];
  activeFileIndex: number;
  onFileSelect: (index: number) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFileIndex,
  onFileSelect,
}) => {
  const handleTabClick = (index: number) => {
    onFileSelect(index);
  };

  return (
    <Box>
      {files.map((file, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(index)}
          style={{
            backgroundColor: activeFileIndex === index ? "lightblue" : "",
          }}
        >
          {file.name}
        </button>
      ))}
    </Box>
  );
};

export default FileExplorer;

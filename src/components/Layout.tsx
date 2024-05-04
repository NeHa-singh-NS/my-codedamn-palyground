"use client";
import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import Terminal from "./Terminal";
import Preview from "./Preview";
import { Grid } from "@mui/material";
import TerminalIcon from "@mui/icons-material/Terminal";

interface File {
  name: string;
  content: string;
}

const Layout: React.FC = () => {
  const initialFiles: File[] = [
    { name: "index.html", content: "<h1>Hello, world!</h1>" },
    { name: "script.js", content: 'console.log("Hello, world!");' },
    { name: "styles.css", content: "/*add your css here*/" },
  ];
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [output, setOutput] = useState<string>("");

  const handleCodeChange = (index: number, newCode: string) => {
    const updatedFiles = [...files];
    updatedFiles[index].content = newCode;
    setFiles(updatedFiles);
    executeCode();
  };

  const executeCode = () => {
    const activeFile = files[activeFileIndex];
    const fileName = activeFile.name;
    const fileContent = activeFile.content;
    let result = "";

    if (activeFile?.name.endsWith(".html")) {
      const htmlContent = `<html><head><style>${
        files.find((file) => file.name === "styles.css")?.content
      }</style></head><body>${fileContent}</body></html>`;
      setOutput(htmlContent);
    } else if (fileName?.endsWith(".css")) {
      // Set the output to CSS content
      setOutput(`<style>${fileContent}</style>`);
    } else if (fileName?.endsWith(".js")) {
      try {
        const code = fileContent;
        let logs: string[] = [];
        // Override console.log to capture logs
        const originalLog = console.log;
        console.log = (...args: any[]) => {
          logs.push(args.join(" "));
        };
        // Evaluate the code
        eval(code);
        // Restore original console.log
        console.log = originalLog;
        // Set the captured logs as console output
        setOutput(logs.join("\n"));
      } catch (error) {
        console.error("Error evaluating code:", error);
      }
    } else {
      setOutput("Unsupported file type");
    }
  };

  const createNewFile = () => {
    const newFileName = prompt("Enter the name of the new file:");
    if (newFileName) {
      const newFile: File = { name: newFileName, content: "" };
      setFiles([...files, newFile]);
      setActiveFileIndex(files.length);
    }
  };
  const fetchUserFiles = async () => {
    try {
      const response = await fetch(`/api/get_file_content?userId=123`);
      if (response.ok) {
        const data = await response.json();
        const updatedFiles = data.files.map((fileName: any) => ({
          name: fileName.name,
          content: fileName.content, // Default content
        }));
        setFiles((prevFiles) => {
          const mergedFiles = [...prevFiles];
          updatedFiles.forEach((newFile: any) => {
            if (
              !mergedFiles.some(
                (existingFile) => existingFile.name === newFile.name
              )
            ) {
              mergedFiles.push(newFile);
            }
          });
          return mergedFiles;
        });
      } else {
        console.error("Failed to fetch files:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchUserFiles();
  }, []);

  const onSaveFile = async () => {
    const activeFile = files[activeFileIndex];
    const fileName = activeFile.name;
    const fileContent = activeFile.content;
    const encodedContent = Buffer.from(fileContent).toString("base64");
    try {
      const response = await fetch("/api/upload_files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "123",
          fileContent: encodedContent,
          fileName: fileName,
        }),
      });

      if (response.ok) {
        alert("File saved successfully");
        fetchUserFiles();
      } else {
        alert("Failed to save file,Please Try again");
      }
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  useEffect(() => {
    executeCode();
  }, [files, activeFileIndex]);

  return (
    <Grid container pt={2.5} spacing={2} style={{ marginTop: "15px" }}>
      <Grid item xs={6} style={{ height: "100%" }}>
        <Editor
          files={files}
          activeFileIndex={activeFileIndex}
          onFileSelect={setActiveFileIndex}
          onCodeChange={handleCodeChange}
          onNewFile={createNewFile}
          onSaveFile={onSaveFile}
        />
      </Grid>

      <Grid
        item
        xs={6}
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Grid item style={{ flex: 1 }}>
          <Preview output={output} />
        </Grid>
        <Grid spacing={2} item style={{ flex: 0.5 }}>
          <TerminalIcon
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          />
          <Terminal />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;

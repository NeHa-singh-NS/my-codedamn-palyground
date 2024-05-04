import React, { useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

interface File {
  name: string;
  content: string;
}

interface EditorProps {
  files: File[];
  activeFileIndex: number;
  onFileSelect: (index: number) => void;
  onCodeChange: (index: number, newCode: string) => void;
  onNewFile: () => void;
  onSaveFile: () => void;
}

const CodeEditor: React.FC<EditorProps> = ({
  files,
  activeFileIndex,
  onFileSelect,
  onCodeChange,
  onNewFile,
  onSaveFile,
}) => {
  const editorRef = useRef<any>();
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onCodeChange(activeFileIndex, value);
    }
  };

  const handleFileSelect = (index: number) => {
    onFileSelect(index);
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const showValue = () => {
    try {
      const code = editorRef.current.getValue();
      let logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        logs.push(args.join(" "));
      };
      eval(code);
      // Restore original console.log
      console.log = originalLog;
      // Set the captured logs as console output
      setConsoleOutput(logs.join("\n"));
    } catch (error) {
      console.error("Error evaluating code:", error);
    }
  };
  return (
    <Box
      style={{
        display: "flex",
        height: "calc(100vh - 64px)",
        overflow: "hidden",
      }}
    >
      <Resizable
        style={{
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #ccc",
          minWidth: "200px",
        }}
        defaultSize={{
          width: "200px",
          height: "100%",
        }}
        minHeight={200}
      >
        <Toolbar>
          <IconButton onClick={onNewFile}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={onSaveFile}>
            <SaveIcon />
          </IconButton>
        </Toolbar>
        <List style={{ flexGrow: 1 }}>
          {files.map((file, index) => (
            <ListItem
              key={index}
              button
              selected={index === activeFileIndex}
              onClick={() => handleFileSelect(index)}
            >
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      </Resizable>
      <Box style={{ flex: 1, padding: "10px", height: "100%" }}>
        <Resizable
          style={{
            borderRight: "1px solid #ccc",
          }}
          defaultSize={{
            width: "500px",
            height: "100%",
          }}
          minHeight={500}
        >
          <MonacoEditor
            language="javascript"
            theme="vs-dark"
            value={files[activeFileIndex].content}
            onChange={(value) => handleEditorChange(value)}
            height="100%"
            width="100%"
            options={{ minimap: { enabled: false } }}
            onMount={handleEditorDidMount}
          />
        </Resizable>
        <Button onClick={showValue}>show</Button>
        <Box dangerouslySetInnerHTML={{ __html: consoleOutput }}></Box>
      </Box>
    </Box>
  );
};

export default CodeEditor;

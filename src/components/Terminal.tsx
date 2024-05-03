import React, { useEffect, useRef } from "react";
import "xterm/css/xterm.css";
import { Resizable } from "re-resizable";

const XtermTerminal = () => {
  const terminalRef = useRef(null);
  let terminal: Terminal | null = null;

  useEffect(() => {
    const loadXterm = async () => {
      // Dynamically import xterm and its addon
      const { Terminal } = await import("xterm");
      const { FitAddon } = await import("xterm-addon-fit");

      terminal = new Terminal();
      const fitAddon = new FitAddon();

      terminal.loadAddon(fitAddon);
      terminal.open(terminalRef.current);
      fitAddon.fit();
      terminal.focus();
      terminal.onData((data: any) => {
        if (data === "\r") {
          // If Enter is pressed, get the current line and execute the command
          const command = terminal.buffer.active
            .getLine(terminal.buffer.active.baseY)
            .translateToString()
            .trim();
          executeCommand(command);
          terminal.write("\r\n");
        } else {
          terminal.write(data); // Write user input to the terminal
        }
      });

      return () => {
        if (terminal) {
          terminal.dispose();
        }
      };
    };

    loadXterm();
  }, []);

  const executeCommand = async (command: string) => {
    try {
      const response = await fetch("/api/terminal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      if (terminal) {
        terminal.write(data.output + "\r\n");
      }
    } catch (error: any) {
      if (terminal) {
        terminal.write(`Error: ${error.message}\r\n`);
      }
    }
  };

  return (
    <Resizable
      defaultSize={{
        width: "auto",
        height: 200,
      }}
    >
      <div
        ref={terminalRef}
        style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
      />
    </Resizable>
  );
};

export default XtermTerminal;

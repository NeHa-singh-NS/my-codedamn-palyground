import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { command } = req.body;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      res
        .status(500)
        .json({ error: "An error occurred while executing the command." });
      return;
    }
    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
    }
    console.log(`Command stdout: ${stdout}`);
    res.json({ output: stdout });
  });
}

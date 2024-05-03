import { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Get user identifier from request query parameters
      const userId = req.query.userId as string;

      // Create a unique folder name based on the user identifier
      const folderName = `user_${userId}`;

      // List files in the user's folder
      const [files] = await storage.bucket("coding_files").getFiles({
        prefix: `${folderName}/`,
      });

      // Extract file names from the list of files
      const fileNames = files.map((file) =>
        file.name.replace(`${folderName}/`, "")
      );

      res.status(200).json({ success: true, files: fileNames });
    } catch (error) {
      console.error("Error fetching files:", error);
      res.status(500).json({ success: false, error: "Failed to fetch files" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}

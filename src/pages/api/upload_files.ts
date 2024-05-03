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
  if (req.method === "POST") {
    try {
      // Get user identifier and file data from request body
      const { userId, fileContent, fileName } = req.body;

      // Create a unique folder name based on the user identifier
      const folderName = `user_${userId}`;

      // Upload file to Google Cloud Storage within the user's folder
      await storage
        .bucket("coding_files")
        .file(`${folderName}/${fileName}`)
        .save(Buffer.from(fileContent, "base64"));

      res
        .status(200)
        .json({ success: true, message: "File uploaded successfully" });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ success: false, error: "Failed to upload file" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}

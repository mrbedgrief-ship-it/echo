import { Router } from "express";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { env } from "../config/env.js";
import { requireAuth } from "../middleware/auth.js";

export const uploadsRouter = Router();
const attachmentDir = path.resolve(env.UPLOAD_DIR, "attachments");
fs.mkdirSync(attachmentDir, { recursive: true });
const upload = multer({ dest: attachmentDir });

uploadsRouter.post("/attachment", requireAuth, upload.single("file"), async (req, res) => {
  res.json({ fileName: req.file?.originalname, fileUrl: `/uploads/attachments/${req.file?.filename}`, mimeType: req.file?.mimetype });
});

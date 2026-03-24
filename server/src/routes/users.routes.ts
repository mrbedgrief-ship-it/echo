import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { prisma } from "../config/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { env } from "../config/env.js";

export const usersRouter = Router();
const uploadDir = path.resolve(env.UPLOAD_DIR, "avatars");
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({ dest: uploadDir });

usersRouter.get("/search", requireAuth, async (req: AuthedRequest, res) => {
  const q = String(req.query.q ?? "");
  const users = await prisma.user.findMany({
    where: {
      id: { not: req.userId },
      OR: [{ displayName: { contains: q } }, { email: { contains: q } }, { username: { contains: q } }],
    },
    take: 20,
    select: { id: true, email: true, username: true, displayName: true, avatarUrl: true },
  });
  res.json(users);
});

usersRouter.put("/profile", requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.user.update({ where: { id: req.userId }, data: { displayName: req.body.displayName }, select: { id: true, email: true, username: true, displayName: true, avatarUrl: true } });
  res.json(user);
});

usersRouter.post("/avatar", requireAuth, upload.single("avatar"), async (req: AuthedRequest, res) => {
  const fileUrl = `/uploads/avatars/${req.file?.filename}`;
  const user = await prisma.user.update({ where: { id: req.userId }, data: { avatarUrl: fileUrl }, select: { id: true, email: true, username: true, displayName: true, avatarUrl: true } });
  res.json(user);
});

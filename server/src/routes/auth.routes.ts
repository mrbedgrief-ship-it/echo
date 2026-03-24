import { Router } from "express";
import { login, refresh, register } from "../services/auth.service.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { prisma } from "../config/prisma.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { email, username, password, displayName } = req.body;
    const result = await register({ email, username, password, displayName });
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const result = await login({ emailOrUsername, password });
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
});

authRouter.post("/refresh", async (req, res) => {
  try {
    const result = await refresh(req.body.refreshToken);
    res.json(result);
  } catch (e) {
    res.status(401).json({ message: (e as Error).message });
  }
});

authRouter.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true, email: true, username: true, displayName: true, avatarUrl: true } });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

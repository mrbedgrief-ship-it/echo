import { Router } from "express";
import { body } from "express-validator";
import { login, refresh, register } from "../services/auth.service.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { prisma } from "../config/prisma.js";

export const authRouter = Router();

authRouter.post("/register", body("email").isEmail(), body("password").isLength({ min: 6 }), async (req, res) => {
  try {
    const result = await register(req.body);
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const result = await login(req.body);
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
  res.json(user);
});

import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { env } from "../config/env.js";

export async function register(payload: { email: string; username: string; displayName: string; password: string }) {
  const exists = await prisma.user.findFirst({ where: { OR: [{ email: payload.email }, { username: payload.username }] } });
  if (exists) throw new Error("Account already exists");
  const passwordHash = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({ data: { ...payload, passwordHash } });
  return issueTokens(user.id);
}

export async function login(payload: { emailOrUsername: string; password: string }) {
  const user = await prisma.user.findFirst({ where: { OR: [{ email: payload.emailOrUsername }, { username: payload.emailOrUsername }] } });
  if (!user) throw new Error("Invalid credentials");
  const valid = await bcrypt.compare(payload.password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");
  return issueTokens(user.id);
}

async function issueTokens(userId: string) {
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);
  await prisma.refreshToken.create({
    data: {
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + env.JWT_REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000),
    },
  });
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { id: true, email: true, username: true, displayName: true, avatarUrl: true } });
  return { accessToken, refreshToken, user };
}

export async function refresh(refreshToken: string) {
  verifyRefreshToken(refreshToken);
  const found = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
  if (!found || found.expiresAt < new Date()) throw new Error("Refresh expired");
  return issueTokens(found.userId);
}

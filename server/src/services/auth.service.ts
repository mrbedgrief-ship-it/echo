import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { env } from "../config/env.js";

export async function register(payload: { email: string; username: string; password: string; displayName?: string }) {
  const email = payload.email.trim().toLowerCase();
  const username = payload.username.trim().toLowerCase();
  const displayName = payload.displayName?.trim() || payload.username.trim();

  if (!email || !username || !payload.password) {
    throw new Error("Username, email, and password are required");
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        displayName,
        passwordHash,
      },
    });
    return issueTokens(user.id);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new Error("User already exists with this email or username");
    }
    throw new Error("Registration failed");
  }
}

export async function login(payload: { emailOrUsername: string; password: string }) {
  const identity = payload.emailOrUsername.trim().toLowerCase();
  if (!identity || !payload.password) throw new Error("Login and password are required");

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identity }, { username: identity }],
    },
  });

  if (!user) throw new Error("Invalid login");
  const valid = await bcrypt.compare(payload.password, user.passwordHash);
  if (!valid) throw new Error("Invalid password");

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

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { id: true, email: true, username: true, displayName: true, avatarUrl: true },
  });

  return { accessToken, refreshToken, user };
}

export async function refresh(refreshToken: string) {
  if (!refreshToken) throw new Error("Refresh token missing");
  verifyRefreshToken(refreshToken);

  const found = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
  if (!found || found.expiresAt < new Date()) throw new Error("Refresh expired");

  return issueTokens(found.userId);
}

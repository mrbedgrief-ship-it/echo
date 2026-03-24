import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signAccessToken(userId: string) {
  return jwt.sign({ userId }, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES });
}

export function signRefreshToken(userId: string) {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: `${env.JWT_REFRESH_EXPIRES_DAYS}d` });
}

export function verifyAccessToken(token: string): { userId: string } {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as { userId: string };
}

export function verifyRefreshToken(token: string): { userId: string } {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
}

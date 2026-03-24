import dotenv from "dotenv";

dotenv.config({ path: process.cwd() + "/../.env" });
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? "access-dev-secret",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "refresh-dev-secret",
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES ?? "15m",
  JWT_REFRESH_EXPIRES_DAYS: Number(process.env.JWT_REFRESH_EXPIRES_DAYS ?? 14),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  UPLOAD_DIR: process.env.UPLOAD_DIR ?? "./uploads",
};

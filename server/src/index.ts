import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import { Server } from "socket.io";
import { env } from "./config/env.js";
import { authRouter } from "./routes/auth.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { conversationsRouter } from "./routes/conversations.routes.js";
import { uploadsRouter } from "./routes/uploads.routes.js";
import { attachSocket } from "./sockets/index.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: env.CORS_ORIGIN } });
attachSocket(io);

fs.mkdirSync(path.resolve(env.UPLOAD_DIR), { recursive: true });
app.use("/uploads", express.static(path.resolve(env.UPLOAD_DIR)));
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/conversations", conversationsRouter);
app.use("/api/uploads", uploadsRouter);

server.listen(env.PORT, () => console.log(`Echo server running on http://localhost:${env.PORT}`));

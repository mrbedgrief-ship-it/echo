import { Server } from "socket.io";
import { verifyAccessToken } from "../utils/jwt.js";
import { prisma } from "../config/prisma.js";
import { sendMessage } from "../services/chat.service.js";

export function attachSocket(io: Server) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token as string;
      const payload = verifyAccessToken(token);
      socket.data.userId = payload.userId;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.data.userId as string;
    socket.join(`user:${userId}`);
    await prisma.userPresence.upsert({ where: { userId }, update: { status: "online", lastSeenAt: new Date() }, create: { userId, status: "online" } });
    io.emit("presence:update", { userId, status: "online" });

    socket.on("conversation:join", (conversationId: string) => socket.join(`conversation:${conversationId}`));

    socket.on("message:send", async (payload: { conversationId: string; text: string; tone?: string; mode?: string }) => {
      const message = await sendMessage({ ...payload, senderId: userId });
      io.to(`conversation:${payload.conversationId}`).emit("message:new", message);
    });

    socket.on("typing", (payload: { conversationId: string; isTyping: boolean }) => {
      socket.to(`conversation:${payload.conversationId}`).emit("typing", { userId, ...payload });
    });

    socket.on("disconnect", async () => {
      await prisma.userPresence.upsert({ where: { userId }, update: { status: "offline", lastSeenAt: new Date() }, create: { userId, status: "offline" } });
      io.emit("presence:update", { userId, status: "offline" });
    });
  });
}

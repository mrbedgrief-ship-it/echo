import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.messageReceipt.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationMember.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.userPresence.deleteMany();
  await prisma.user.deleteMany();

  const hash = await bcrypt.hash("password123", 10);
  const users = await prisma.$transaction([
    prisma.user.create({ data: { email: "maya@echo.app", username: "maya", displayName: "Maya Chen", passwordHash: hash } }),
    prisma.user.create({ data: { email: "leo@echo.app", username: "leo", displayName: "Leo Alvarez", passwordHash: hash } }),
    prisma.user.create({ data: { email: "nora@echo.app", username: "nora", displayName: "Nora Patel", passwordHash: hash } }),
  ]);

  const convo = await prisma.conversation.create({
    data: {
      members: { create: [{ userId: users[0].id }, { userId: users[1].id }] },
      messages: {
        create: [
          { senderId: users[0].id, text: "Hey Leo, can we sync on launch tomorrow?", tone: "warm", mode: "Sync" },
          { senderId: users[1].id, text: "Absolutely. I can do 10:30 AM.", tone: "neutral", mode: "Sync" },
        ],
      },
    },
  });

  await prisma.conversation.create({
    data: {
      members: { create: [{ userId: users[0].id }, { userId: users[2].id }] },
      messages: {
        create: [
          { senderId: users[2].id, text: "Low battery socially tonight, but thinking of you 🫶", tone: "fragile", mode: "Quiet" },
          { senderId: users[0].id, text: "No pressure. Here when you want to talk.", tone: "warm", mode: "Quiet" },
        ],
      },
    },
  });

  console.log("Seed complete", { users: users.map((u) => u.email), conversation: convo.id });
}

main().finally(async () => prisma.$disconnect());

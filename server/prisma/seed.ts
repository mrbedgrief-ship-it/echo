import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function resetData() {
  await prisma.messageReceipt.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationMember.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.userPresence.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await resetData();

  const demoHash = await bcrypt.hash("demo123", 10);
  const mayaHash = await bcrypt.hash("maya123", 10);
  const leoHash = await bcrypt.hash("leo123", 10);

  const [demo, maya, leo] = await prisma.$transaction([
    prisma.user.create({ data: { email: "demo@echo.app", username: "demo", displayName: "Demo User", passwordHash: demoHash } }),
    prisma.user.create({ data: { email: "maya@echo.app", username: "maya", displayName: "Maya Chen", passwordHash: mayaHash } }),
    prisma.user.create({ data: { email: "leo@echo.app", username: "leo", displayName: "Leo Alvarez", passwordHash: leoHash } }),
  ]);

  await prisma.conversation.create({
    data: {
      members: { create: [{ userId: demo.id }, { userId: maya.id }] },
      messages: {
        create: [
          { senderId: demo.id, text: "Hey Maya — this auth flow finally works.", tone: "warm", mode: "Pulse" },
          { senderId: maya.id, text: "Confirmed. Logged in with username + password.", tone: "neutral", mode: "Sync" },
        ],
      },
    },
  });

  await prisma.conversation.create({
    data: {
      members: { create: [{ userId: demo.id }, { userId: leo.id }] },
      messages: {
        create: [
          { senderId: leo.id, text: "I logged in using email and leo123.", tone: "warm", mode: "Sync" },
          { senderId: demo.id, text: "Great. Let's ship it.", tone: "urgent", mode: "Deep" },
        ],
      },
    },
  });

  console.log("Seed complete. Demo credentials:");
  console.log("- demo / demo123 (demo@echo.app)");
  console.log("- maya / maya123 (maya@echo.app)");
  console.log("- leo / leo123 (leo@echo.app)");
}

main().finally(async () => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";

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
  console.log("Database records cleared.");
}

main().finally(async () => prisma.$disconnect());

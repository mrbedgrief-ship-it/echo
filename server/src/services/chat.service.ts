import { prisma } from "../config/prisma.js";

export async function listConversations(userId: string) {
  const memberships = await prisma.conversationMember.findMany({
    where: { userId },
    include: {
      conversation: {
        include: {
          members: { include: { user: true } },
          messages: { orderBy: { createdAt: "desc" }, take: 1 },
        },
      },
    },
  });

  return memberships.map((m) => {
    const other = m.conversation.members.find((x) => x.userId !== userId)?.user;
    const last = m.conversation.messages[0];
    return {
      conversationId: m.conversationId,
      title: other?.displayName ?? "Conversation",
      avatarUrl: other?.avatarUrl,
      lastMessage: last?.text,
      lastMessageAt: last?.createdAt,
      unreadCount: 0,
      mode: last?.mode ?? "Pulse",
    };
  });
}

export async function createOrGetDirectConversation(userId: string, targetUserId: string) {
  const existing = await prisma.conversation.findFirst({
    where: {
      members: {
        every: {
          userId: { in: [userId, targetUserId] },
        },
      },
    },
    include: { members: true },
  });
  if (existing && existing.members.length === 2) return existing;

  return prisma.conversation.create({
    data: {
      members: {
        create: [{ userId }, { userId: targetUserId }],
      },
    },
  });
}

export async function getMessages(conversationId: string, userId: string) {
  const isMember = await prisma.conversationMember.findUnique({ where: { conversationId_userId: { conversationId, userId } } });
  if (!isMember) throw new Error("Forbidden");
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: { sender: { select: { id: true, displayName: true, avatarUrl: true } }, attachments: true },
  });
}

export async function sendMessage(payload: { conversationId: string; senderId: string; text: string; tone?: string; mode?: string }) {
  const message = await prisma.message.create({
    data: {
      conversationId: payload.conversationId,
      senderId: payload.senderId,
      text: payload.text,
      tone: payload.tone ?? "neutral",
      mode: payload.mode ?? "Pulse",
    },
    include: { sender: { select: { id: true, displayName: true, avatarUrl: true } } },
  });

  const members = await prisma.conversationMember.findMany({ where: { conversationId: payload.conversationId } });
  await prisma.messageReceipt.createMany({ data: members.map((m) => ({ messageId: message.id, userId: m.userId, deliveredAt: m.userId === payload.senderId ? new Date() : null, readAt: m.userId === payload.senderId ? new Date() : null })) });

  return message;
}

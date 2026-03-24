import { Router } from "express";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";
import { createOrGetDirectConversation, getMessages, listConversations, sendMessage } from "../services/chat.service.js";

export const conversationsRouter = Router();

conversationsRouter.get("/list", requireAuth, async (req: AuthedRequest, res) => {
  res.json(await listConversations(req.userId!));
});

conversationsRouter.post("/create", requireAuth, async (req: AuthedRequest, res) => {
  const convo = await createOrGetDirectConversation(req.userId!, req.body.targetUserId);
  res.json(convo);
});

conversationsRouter.get("/:id/messages", requireAuth, async (req: AuthedRequest, res) => {
  try {
    res.json(await getMessages(req.params.id, req.userId!));
  } catch (e) {
    res.status(403).json({ message: (e as Error).message });
  }
});

conversationsRouter.post("/:id/messages", requireAuth, async (req: AuthedRequest, res) => {
  const msg = await sendMessage({ conversationId: req.params.id, senderId: req.userId!, text: req.body.text, tone: req.body.tone, mode: req.body.mode });
  res.json(msg);
});

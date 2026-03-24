import { create } from "zustand";
import api from "@/lib/api";
import { getSocket } from "@/lib/socket";
import { ConversationPreview, Message, Mode, Tone } from "@/types";

type ChatState = {
  conversations: ConversationPreview[];
  activeConversationId: string | null;
  messages: Message[];
  typingByConversation: Record<string, boolean>;
  loadConversations: () => Promise<void>;
  openConversation: (id: string) => Promise<void>;
  sendMessage: (payload: { text: string; tone: Tone; mode: Mode }) => void;
  bindRealtime: () => void;
};

export const useChat = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  typingByConversation: {},
  async loadConversations() {
    const { data } = await api.get("/conversations/list");
    set({ conversations: data, activeConversationId: data[0]?.conversationId ?? null });
    if (data[0]) get().openConversation(data[0].conversationId);
  },
  async openConversation(id) {
    const { data } = await api.get(`/conversations/${id}/messages`);
    set({ activeConversationId: id, messages: data });
    getSocket()?.emit("conversation:join", id);
  },
  sendMessage(payload) {
    const id = get().activeConversationId;
    if (!id) return;
    getSocket()?.emit("message:send", { conversationId: id, ...payload });
  },
  bindRealtime() {
    const socket = getSocket();
    if (!socket) return;
    socket.off("message:new");
    socket.on("message:new", (message: Message) => {
      set((state) => (state.activeConversationId === message.conversationId ? { messages: [...state.messages, message] } : state));
    });
    socket.off("typing");
    socket.on("typing", ({ conversationId, isTyping }) => {
      set((state) => ({ typingByConversation: { ...state.typingByConversation, [conversationId]: isTyping } }));
    });
  },
}));

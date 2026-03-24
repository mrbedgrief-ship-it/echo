export type Tone = "warm" | "neutral" | "urgent" | "fragile";
export type Mode = "Pulse" | "Deep" | "Sync" | "Drift" | "Quiet";

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
}

export interface ConversationPreview {
  conversationId: string;
  title: string;
  avatarUrl?: string | null;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  mode: Mode;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  tone: Tone;
  mode: Mode;
  createdAt: string;
  sender: { id: string; displayName: string; avatarUrl?: string | null };
}

export type PresenceState = "online" | "away" | "offline";
export type Mode = "Pulse" | "Deep" | "Sync" | "Drift" | "Quiet";
export type Tone = "warm" | "neutral" | "urgent" | "fragile";

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
}

export interface ChatPreview {
  conversationId: string;
  title: string;
  avatarUrl?: string | null;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

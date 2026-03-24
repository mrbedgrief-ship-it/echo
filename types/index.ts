export type PresenceState =
  | "available now"
  | "thinking"
  | "low battery socially"
  | "open later tonight"
  | "silent but present";

export type Mode = "Pulse" | "Deep" | "Sync" | "Drift" | "Quiet";
export type Tone = "warm" | "neutral" | "urgent" | "fragile";
export type TimingOption =
  | "send now"
  | "deliver tonight"
  | "open tomorrow morning"
  | "save as time capsule";

export type Message = {
  id: string;
  sender: "me" | "them";
  text: string;
  tone: Tone;
  time: string;
  reactions?: string[];
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  mode: Mode;
  presence: PresenceState;
  lastInteraction: string;
  warmth: number;
  unread: number;
  category: "Close" | "Work" | "Quiet";
  connectionType: string;
  communicationRhythm: string;
  recurringTopics: string[];
  sharedMemories: string[];
  savedEchoes: string[];
  insideJokes: string[];
  returnedMessages: string[];
  thingsLeftUnsaid: string[];
  timeline: { label: string; detail: string }[];
  messages: Message[];
};

export type Insight = {
  id: string;
  title: string;
  body: string;
  tone: "care" | "support" | "celebrate";
};

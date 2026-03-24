import { Conversation, Insight, Mode, PresenceState, Tone } from "@/types";

export const modes: Mode[] = ["Pulse", "Deep", "Sync", "Drift", "Quiet"];
export const presenceStates: PresenceState[] = [
  "available now",
  "thinking",
  "low battery socially",
  "open later tonight",
  "silent but present",
];
export const tones: Tone[] = ["warm", "neutral", "urgent", "fragile"];

export const conversations: Conversation[] = [
  {
    id: "maya",
    name: "Maya Chen",
    avatar: "MC",
    mode: "Deep",
    presence: "thinking",
    lastInteraction: "12m ago",
    warmth: 92,
    unread: 2,
    category: "Close",
    connectionType: "Best friend · 8 years",
    communicationRhythm: "Long evening reflections, 4-5 times/week",
    recurringTopics: ["Creative burnout", "Family updates", "Sunday reset plans"],
    sharedMemories: ["Night train to Portland", "The rain-soaked sketchbook cafe"],
    savedEchoes: ["You don't have to solve this tonight, just breathe with it."],
    insideJokes: ["Emergency croissant protocol", "Tiny thunder applause"],
    returnedMessages: ["Can we revisit your studio move next week?"],
    thingsLeftUnsaid: ["How proud you are of her quiet resilience"],
    timeline: [
      { label: "Feb 3", detail: "Supported each other during deadline week" },
      { label: "Mar 11", detail: "Shared voice notes instead of texts" },
      { label: "Today", detail: "Both switched to Deep mode" },
    ],
    messages: [
      { id: "m1", sender: "them", text: "I keep rereading what you said yesterday. It helped.", tone: "warm", time: "8:14 PM", reactions: ["💜"] },
      { id: "m2", sender: "me", text: "I'm glad. Want to talk through the part that's still heavy?", tone: "fragile", time: "8:16 PM" },
      { id: "m3", sender: "them", text: "Maybe after dinner? My brain is soup right now.", tone: "neutral", time: "8:18 PM" },
    ],
  },
  {
    id: "leo",
    name: "Leo Alvarez",
    avatar: "LA",
    mode: "Sync",
    presence: "available now",
    lastInteraction: "1h ago",
    warmth: 78,
    unread: 0,
    category: "Work",
    connectionType: "Co-founder",
    communicationRhythm: "Frequent tactical check-ins",
    recurringTopics: ["Roadmap", "Hiring", "Investor prep"],
    sharedMemories: ["First product launch all-nighter"],
    savedEchoes: ["Let's optimize for clarity, not speed panic."],
    insideJokes: ["Version banana"],
    returnedMessages: ["Hiring scorecard notes"],
    thingsLeftUnsaid: ["Need to discuss pace sustainability"],
    timeline: [
      { label: "Yesterday", detail: "Planning sprint in Sync mode" },
      { label: "Today", detail: "Aligned on onboarding prototype" },
    ],
    messages: [
      { id: "l1", sender: "me", text: "Pushed the onboarding polish. Want a quick pass before standup?", tone: "neutral", time: "10:02 AM" },
      { id: "l2", sender: "them", text: "Yes — give me 20 mins. Also, this looks premium.", tone: "warm", time: "10:05 AM", reactions: ["🔥", "✅"] },
    ],
  },
  {
    id: "nora",
    name: "Nora Patel",
    avatar: "NP",
    mode: "Quiet",
    presence: "silent but present",
    lastInteraction: "Yesterday",
    warmth: 85,
    unread: 1,
    category: "Quiet",
    connectionType: "Sibling",
    communicationRhythm: "Low-volume, high-signal",
    recurringTopics: ["Parents", "Health check-ins", "Recipes"],
    sharedMemories: ["Grandma's winter soup", "Airport sunrise hug"],
    savedEchoes: ["No pressure to reply, I'm here."],
    insideJokes: ["Soup diplomacy"],
    returnedMessages: ["Photo album cleanup"],
    thingsLeftUnsaid: ["How much her check-ins matter"],
    timeline: [
      { label: "Last week", detail: "Sent mood cards while traveling" },
      { label: "Yesterday", detail: "Shared a soft voice memo" },
    ],
    messages: [
      { id: "n1", sender: "them", text: "🫶", tone: "warm", time: "9:11 PM" },
      { id: "n2", sender: "me", text: "Made the soup. It tastes like home.", tone: "fragile", time: "9:18 PM" },
    ],
  },
];

export const insights: Insight[] = [
  {
    id: "i1",
    title: "Gentle nudge: meaningful replies",
    body: "Sam and Nora both sent emotionally rich notes this week. You may want to respond before Thursday evening.",
    tone: "care",
  },
  {
    id: "i2",
    title: "Conversation drift check",
    body: "Your thread with Leo has been logistics-heavy for 9 days. Consider switching one message to Deep mode.",
    tone: "support",
  },
  {
    id: "i3",
    title: "Warm streak",
    body: "Maya and you have shared supportive messages for 6 consecutive days — steady and reciprocal.",
    tone: "celebrate",
  },
  {
    id: "i4",
    title: "Most revisited memory",
    body: "You revisited 'Night train to Portland' three times this month. It appears to be an anchor memory.",
    tone: "support",
  },
];

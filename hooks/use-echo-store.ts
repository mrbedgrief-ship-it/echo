"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TimingOption, Tone } from "@/types";

type EchoState = {
  aiAssistance: boolean;
  notificationGentleness: number;
  presenceLanguage: string;
  theme: "dark";
  drafts: Record<string, string>;
  selectedTone: Tone;
  selectedTiming: TimingOption;
  setDraft: (key: string, value: string) => void;
  setAiAssistance: (enabled: boolean) => void;
  setNotificationGentleness: (value: number) => void;
  setPresenceLanguage: (value: string) => void;
  setTone: (tone: Tone) => void;
  setTiming: (timing: TimingOption) => void;
};

export const useEchoStore = create<EchoState>()(
  persist(
    (set) => ({
      aiAssistance: true,
      notificationGentleness: 70,
      presenceLanguage: "emotion-first",
      theme: "dark",
      drafts: {},
      selectedTone: "warm",
      selectedTiming: "send now",
      setDraft: (key, value) => set((state) => ({ drafts: { ...state.drafts, [key]: value } })),
      setAiAssistance: (enabled) => set({ aiAssistance: enabled }),
      setNotificationGentleness: (value) => set({ notificationGentleness: value }),
      setPresenceLanguage: (value) => set({ presenceLanguage: value }),
      setTone: (tone) => set({ selectedTone: tone }),
      setTiming: (timing) => set({ selectedTiming: timing }),
    }),
    { name: "echo-settings" },
  ),
);

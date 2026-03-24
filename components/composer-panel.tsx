"use client";

import { ImageIcon, Mic, Send, Sparkles, SmilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tones } from "@/data/mock";
import { useEchoStore } from "@/hooks/use-echo-store";

export function ComposerPanel({ draftKey = "global" }: { draftKey?: string }) {
  const { drafts, setDraft, selectedTone, setTone, selectedTiming } = useEchoStore();

  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-card/70 p-3 backdrop-blur">
      <div className="flex gap-2 overflow-auto">
        {tones.map((tone) => (
          <button key={tone} onClick={() => setTone(tone)} className={`rounded-full px-3 py-1 text-xs capitalize ${selectedTone === tone ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
            {tone}
          </button>
        ))}
      </div>
      <Input placeholder="Send a thoughtful message..." value={drafts[draftKey] ?? ""} onChange={(e) => setDraft(draftKey, e.target.value)} />
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 text-muted-foreground">
          <button className="rounded-xl p-2 hover:bg-accent"><SmilePlus className="h-4 w-4" /></button>
          <button className="rounded-xl p-2 hover:bg-accent"><ImageIcon className="h-4 w-4" /></button>
          <button className="rounded-xl p-2 hover:bg-accent"><Mic className="h-4 w-4" /></button>
          <button className="rounded-xl p-2 hover:bg-accent"><Sparkles className="h-4 w-4" /></button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{selectedTiming}</span>
          <Button size="icon"><Send className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}

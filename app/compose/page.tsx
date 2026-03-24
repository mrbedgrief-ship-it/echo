"use client";

import { useState } from "react";
import { conversations, modes, tones } from "@/data/mock";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

export default function ComposePage() {
  const [recipient, setRecipient] = useState(conversations[0].id);
  return (
    <PageShell>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Compose with context</h1>
        <Card className="space-y-4 p-4">
          <label className="text-sm">Recipient</label>
          <select className="w-full rounded-xl border border-border bg-background p-2" value={recipient} onChange={(e) => setRecipient(e.target.value)}>
            {conversations.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <label className="text-sm">Communication mode</label>
          <div className="flex flex-wrap gap-2">{modes.map((mode) => <button key={mode} className="rounded-full bg-secondary px-3 py-1 text-xs">{mode}</button>)}</div>
          <label className="text-sm">Tone</label>
          <div className="flex flex-wrap gap-2">{tones.map((tone) => <button key={tone} className="rounded-full bg-secondary px-3 py-1 text-xs capitalize">{tone}</button>)}</div>
          <label className="text-sm">Timing</label>
          <Input defaultValue="deliver tonight" />
          <label className="text-sm">Sensitivity</label>
          <Input defaultValue="High emotional context" />
          <Textarea placeholder="Draft your message with intention..." />
          <Button className="w-full">Send thoughtfully</Button>
        </Card>
        <Card className="p-4">
          <h2 className="font-medium">AI rewrite helper</h2>
          <div className="mt-3 grid gap-2">
            <div className="rounded-xl bg-secondary p-3 text-sm"><span className="text-cyan-200">Gentler:</span> “No rush at all — I’d love to hear your thoughts whenever it feels right.”</div>
            <div className="rounded-xl bg-secondary p-3 text-sm"><span className="text-cyan-200">Clearer:</span> “Could we align on tomorrow’s priorities by 6 PM so I can prep?”</div>
            <div className="rounded-xl bg-secondary p-3 text-sm"><span className="text-cyan-200">Shorter:</span> “Thinking of you. Here when you’re ready.”</div>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}

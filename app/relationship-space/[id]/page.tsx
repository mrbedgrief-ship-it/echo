"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { conversations } from "@/data/mock";
import { Card } from "@/components/ui/card";
import { MemoryCard } from "@/components/memory-card";
import { PageShell } from "@/components/page-shell";

export default function RelationshipSpacePage() {
  const params = useParams<{ id: string }>();
  const convo = conversations.find((c) => c.id === params.id);
  if (!convo) return notFound();

  return (
    <PageShell>
      <div className="space-y-4">
        <Link href={`/conversations/${convo.id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ChevronLeft className="h-4 w-4" /> Back to conversation</Link>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-cyan-200">Relationship space</p>
          <h1 className="mt-1 text-2xl font-semibold">{convo.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{convo.connectionType} · {convo.communicationRhythm}</p>
          <div className="mt-4">
            <p className="mb-2 text-sm text-muted-foreground">Relationship health</p>
            <div className="h-2 rounded-full bg-secondary"><div className="h-2 rounded-full bg-gradient-to-r from-indigo-300 to-cyan-200" style={{ width: `${convo.warmth}%` }} /></div>
          </div>
        </Card>

        <div className="grid gap-3 md:grid-cols-2">
          <MemoryCard title="Recurring topics" subtitle={convo.recurringTopics.join(" · ")} />
          <MemoryCard title="Shared memories" subtitle={convo.sharedMemories.join(" · ")} />
          <MemoryCard title="Saved echoes" subtitle={convo.savedEchoes.join(" · ")} />
          <MemoryCard title="Inside jokes" subtitle={convo.insideJokes.join(" · ")} />
          <MemoryCard title="Returned messages" subtitle={convo.returnedMessages.join(" · ")} />
          <MemoryCard title="Things left unsaid" subtitle={convo.thingsLeftUnsaid.join(" · ")} />
        </div>

        <Card className="p-4">
          <h2 className="font-medium">Emotional timeline</h2>
          <div className="mt-3 space-y-3">
            {convo.timeline.map((event) => (
              <div key={event.label} className="rounded-xl border border-border/50 bg-background/30 p-3">
                <p className="text-xs text-cyan-200">{event.label}</p>
                <p className="text-sm text-muted-foreground">{event.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

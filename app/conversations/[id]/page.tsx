"use client";

import { notFound, useParams } from "next/navigation";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { conversations } from "@/data/mock";
import { ConversationHeader } from "@/components/conversation-header";
import { MessageBubble } from "@/components/message-bubble";
import { ComposerPanel } from "@/components/composer-panel";
import { useEchoStore } from "@/hooks/use-echo-store";

export default function ConversationPage() {
  const params = useParams<{ id: string }>();
  const convo = useMemo(() => conversations.find((c) => c.id === params.id), [params.id]);
  const { selectedTiming, setTiming } = useEchoStore();

  if (!convo) return notFound();

  return (
    <div className="-mx-4 min-h-screen sm:mx-0">
      <ConversationHeader convo={convo} />
      <section className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-5">
        {convo.messages.map((message) => <MessageBubble key={message.id} message={message} />)}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 rounded-2xl border border-border/60 bg-card/70 p-3">
          <p className="mb-2 text-xs text-muted-foreground">Delivery timing</p>
          <div className="flex flex-wrap gap-2">
            {(["send now", "deliver tonight", "open tomorrow morning", "save as time capsule"] as const).map((timing) => (
              <button key={timing} onClick={() => setTiming(timing)} className={`rounded-full px-3 py-1 text-xs ${selectedTiming === timing ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {timing}
              </button>
            ))}
          </div>
        </motion.div>
        <ComposerPanel draftKey={convo.id} />
      </section>
    </div>
  );
}

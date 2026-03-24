"use client";

import { motion } from "framer-motion";
import { Message } from "@/types";
import { ToneBadge } from "@/components/badges";
import { cn } from "@/lib/utils";

export function MessageBubble({ message }: { message: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("max-w-[82%] rounded-2xl p-3", message.sender === "me" ? "ml-auto bg-indigo-500/20" : "bg-card")}
    >
      <div className="mb-2 flex items-center gap-2"><ToneBadge tone={message.tone} /><span className="text-[11px] text-muted-foreground">{message.time}</span></div>
      <p className="text-sm leading-relaxed">{message.text}</p>
      {!!message.reactions?.length && <p className="mt-2 text-xs">{message.reactions.join(" ")}</p>}
    </motion.div>
  );
}

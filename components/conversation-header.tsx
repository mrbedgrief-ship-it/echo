import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Conversation } from "@/types";
import { ModeBadge, PresencePill } from "@/components/badges";

export function ConversationHeader({ convo }: { convo: Conversation }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/home" className="rounded-xl p-2 hover:bg-accent"><ChevronLeft className="h-4 w-4" /></Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-300/20">{convo.avatar}</div>
          <div>
            <p className="font-medium">{convo.name}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              <ModeBadge mode={convo.mode} />
              <PresencePill presence={convo.presence} />
            </div>
          </div>
        </div>
        <Link href={`/relationship-space/${convo.id}`} className="rounded-xl border border-border px-3 py-1.5 text-xs text-muted-foreground">Relationship space</Link>
      </div>
    </header>
  );
}

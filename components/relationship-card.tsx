import Link from "next/link";
import { Conversation } from "@/types";
import { Card } from "@/components/ui/card";
import { ModeBadge, PresencePill } from "@/components/badges";

export function RelationshipCard({ convo }: { convo: Conversation }) {
  return (
    <Card className="p-4 shadow-glow">
      <Link href={`/conversations/${convo.id}`} className="block space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-300/20 font-semibold text-indigo-100">{convo.avatar}</div>
            <div>
              <p className="font-medium">{convo.name}</p>
              <p className="text-xs text-muted-foreground">{convo.lastInteraction}</p>
            </div>
          </div>
          {convo.unread > 0 && <span className="rounded-full bg-cyan-300/20 px-2 py-1 text-xs text-cyan-100">{convo.unread}</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          <ModeBadge mode={convo.mode} />
          <PresencePill presence={convo.presence} />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Connection warmth</span>
          <span>{convo.warmth}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary">
          <div className="h-2 rounded-full bg-gradient-to-r from-lime-200 to-cyan-200" style={{ width: `${convo.warmth}%` }} />
        </div>
      </Link>
    </Card>
  );
}

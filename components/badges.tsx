import { Mode, PresenceState, Tone } from "@/types";
import { cn } from "@/lib/utils";

export function ModeBadge({ mode }: { mode: Mode }) {
  const styles: Record<Mode, string> = {
    Pulse: "bg-cyan-400/15 text-cyan-200",
    Deep: "bg-indigo-400/20 text-indigo-100",
    Sync: "bg-emerald-400/20 text-emerald-100",
    Drift: "bg-violet-400/20 text-violet-100",
    Quiet: "bg-slate-400/20 text-slate-100",
  };
  return <span className={cn("rounded-full px-2.5 py-1 text-xs", styles[mode])}>{mode}</span>;
}

export function PresencePill({ presence }: { presence: PresenceState }) {
  return <span className="rounded-full border border-border/70 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground">{presence}</span>;
}

export function ToneBadge({ tone }: { tone: Tone }) {
  const styles: Record<Tone, string> = {
    warm: "bg-rose-300/20 text-rose-100",
    neutral: "bg-slate-300/20 text-slate-100",
    urgent: "bg-amber-300/20 text-amber-100",
    fragile: "bg-violet-300/20 text-violet-100",
  };
  return <span className={cn("rounded-full px-2 py-0.5 text-[11px] capitalize", styles[tone])}>{tone}</span>;
}

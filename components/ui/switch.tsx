"use client";

import { cn } from "@/lib/utils";

export function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void; className?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn("inline-flex h-6 w-11 items-center rounded-full bg-muted p-0.5", checked && "bg-primary")}
    >
      <span className={cn("h-5 w-5 rounded-full bg-white transition-transform", checked && "translate-x-5")} />
    </button>
  );
}

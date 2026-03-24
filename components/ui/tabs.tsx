"use client";

import { cn } from "@/lib/utils";

export function Tabs({ children }: { children: React.ReactNode; value?: string; onValueChange?: (v: string) => void }) {
  return <div>{children}</div>;
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex h-10 items-center rounded-xl bg-secondary p-1", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm", className)} {...props} />;
}

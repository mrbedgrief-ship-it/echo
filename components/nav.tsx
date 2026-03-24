"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, PencilLine, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/compose", label: "Compose", icon: PencilLine },
  { href: "/insights", label: "Insights", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-2xl border border-border/60 bg-card/90 p-2 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={cn("flex flex-col items-center rounded-xl px-2 py-2 text-[11px]", active ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
              <Icon className="mb-1 h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function DesktopSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-6 hidden h-fit w-64 rounded-2xl border border-border/60 bg-card/80 p-4 backdrop-blur lg:block">
      <div className="mb-6 flex items-center gap-2 text-lg font-semibold">
        <BarChart3 className="h-5 w-5 text-cyan-200" /> Echo
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-2 rounded-xl px-3 py-2 text-sm", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent")}>
              <Icon className="h-4 w-4" /> {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

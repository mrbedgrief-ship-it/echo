"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { conversations } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RelationshipCard } from "@/components/relationship-card";
import { PageShell } from "@/components/page-shell";

const filters = ["All", "Close", "Work", "Quiet", "Unread"] as const;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "All" ? true : filter === "Unread" ? c.unread > 0 : c.category === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <PageShell>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Relationship spaces</h1>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search people, moods, memories..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Tabs>
          <TabsList className="w-full justify-start overflow-auto">
            {filters.map((f) => (
              <TabsTrigger key={f} onClick={() => setFilter(f)} className={filter === f ? "bg-background text-foreground" : "text-muted-foreground"}>
                {f}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.length ? filtered.map((convo) => <RelationshipCard key={convo.id} convo={convo} />) : <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">No spaces match this filter yet.</p>}
        </div>
      </section>
    </PageShell>
  );
}

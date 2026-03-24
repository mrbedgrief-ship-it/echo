import { insights } from "@/data/mock";
import { InsightCard } from "@/components/insight-card";
import { PageShell } from "@/components/page-shell";

export default function InsightsPage() {
  return (
    <PageShell>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Insights</h1>
        <p className="text-sm text-muted-foreground">Calm reflections designed to support healthier communication patterns.</p>
        <div className="space-y-3">
          {insights.map((insight) => <InsightCard key={insight.id} insight={insight} />)}
        </div>
      </section>
    </PageShell>
  );
}

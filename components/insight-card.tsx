import { Insight } from "@/types";
import { Card } from "@/components/ui/card";
import { HeartHandshake, Sparkles, WandSparkles } from "lucide-react";

export function InsightCard({ insight }: { insight: Insight }) {
  const Icon = insight.tone === "care" ? HeartHandshake : insight.tone === "celebrate" ? Sparkles : WandSparkles;
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center gap-2 text-cyan-200"><Icon className="h-4 w-4" /> <h3 className="font-medium">{insight.title}</h3></div>
      <p className="text-sm text-muted-foreground">{insight.body}</p>
    </Card>
  );
}

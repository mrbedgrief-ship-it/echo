import Link from "next/link";
import { Heart, TimerReset, Waves } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const items = [
  { icon: Waves, title: "Communication modes", copy: "Shift between Pulse, Deep, Sync, Drift, and Quiet depending on emotional bandwidth." },
  { icon: Heart, title: "Emotional presence", copy: "Share states like thinking or silent but present, not just online/offline." },
  { icon: TimerReset, title: "Context-aware timing", copy: "Deliver messages tonight, tomorrow morning, or as a time capsule." },
];

export default function OnboardingPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-xl space-y-6 pt-8">
        <h1 className="text-center text-4xl font-semibold tracking-tight">Echo</h1>
        <p className="text-center text-muted-foreground">A calmer way to stay close.</p>
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.title} className="p-5">
              <item.icon className="mb-3 h-5 w-5 text-cyan-200" />
              <h2 className="font-medium">{item.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{item.copy}</p>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link href="/home"><Button className="w-full" size="lg">Get started</Button></Link>
          <Link href="/home"><Button className="w-full" variant="secondary" size="lg">Continue as demo</Button></Link>
        </div>
      </section>
    </PageShell>
  );
}

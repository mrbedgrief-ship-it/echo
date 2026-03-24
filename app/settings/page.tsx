"use client";

import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useEchoStore } from "@/hooks/use-echo-store";

export default function SettingsPage() {
  const {
    aiAssistance,
    setAiAssistance,
    notificationGentleness,
    setNotificationGentleness,
    presenceLanguage,
    setPresenceLanguage,
  } = useEchoStore();

  return (
    <PageShell>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <Card className="space-y-3 p-4">
          <h2 className="font-medium">Profile</h2>
          <Input defaultValue="Alex Rivera" />
          <Input defaultValue="Design lead, learning slower communication." />
        </Card>
        <Card className="space-y-3 p-4">
          <h2 className="font-medium">Notification gentleness</h2>
          <input type="range" min={0} max={100} value={notificationGentleness} onChange={(e) => setNotificationGentleness(Number(e.target.value))} className="w-full" />
          <p className="text-xs text-muted-foreground">Current gentleness: {notificationGentleness}%</p>
        </Card>
        <Card className="space-y-3 p-4">
          <h2 className="font-medium">Privacy and AI</h2>
          <div className="flex items-center justify-between"><span className="text-sm">AI assistance</span><Switch checked={aiAssistance} onCheckedChange={setAiAssistance} /></div>
          <div className="space-y-2">
            <span className="text-sm">Presence language customization</span>
            <Input value={presenceLanguage} onChange={(e) => setPresenceLanguage(e.target.value)} />
          </div>
          <div className="text-sm text-muted-foreground">Theme: dark by default for calmer visual ergonomics.</div>
        </Card>
      </section>
    </PageShell>
  );
}

import { Card } from "@/components/ui/card";

export function MemoryCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Card className="p-4">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
    </Card>
  );
}

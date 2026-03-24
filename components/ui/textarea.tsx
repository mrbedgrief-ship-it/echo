import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => {
  return <textarea ref={ref} className={cn("min-h-24 w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm outline-none ring-ring placeholder:text-muted-foreground focus:ring-2", className)} {...props} />;
});
Textarea.displayName = "Textarea";

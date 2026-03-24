import type { Metadata } from "next";
import "./globals.css";
import { BottomNav, DesktopSidebar } from "@/components/nav";

export const metadata: Metadata = {
  title: "Echo — A calmer way to stay close",
  description: "Emotionally intelligent messaging MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="mx-auto flex min-h-screen max-w-6xl gap-6 px-4 py-6 lg:px-6">
          <DesktopSidebar />
          <div className="flex-1">{children}</div>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}

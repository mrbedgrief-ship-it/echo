import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthScreen } from "@/components/auth-screen";
import { Sidebar } from "@/components/sidebar";
import { ChatPanel } from "@/components/chat-panel";
import { SettingsDrawer } from "@/components/settings-drawer";
import { useAuth } from "@/store/use-auth";
import { useChat } from "@/store/use-chat";
import { connectSocket } from "@/lib/socket";

export default function App() {
  const { user, accessToken, hydrate } = useAuth();
  const { loadConversations, bindRealtime } = useChat();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!accessToken || !user) return;
    const socket = connectSocket(accessToken);
    loadConversations().then(bindRealtime);
    return () => socket.disconnect();
  }, [accessToken, user, loadConversations, bindRealtime]);

  if (!user) return <AuthScreen />;

  return (
    <div className="h-screen p-3">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="relative flex h-full overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl">
        <Sidebar onOpenSettings={() => setSettingsOpen(true)} />
        <ChatPanel />
        <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </motion.div>
    </div>
  );
}

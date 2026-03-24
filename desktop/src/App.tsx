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

  useEffect(() => { hydrate(); }, [hydrate]);

  useEffect(() => {
    if (!accessToken || !user) return;
    const socket = connectSocket(accessToken);
    loadConversations();
    bindRealtime();
    return () => { socket.disconnect(); };
  }, [accessToken, user, loadConversations, bindRealtime]);

  if (!user) return <AuthScreen />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex h-screen overflow-hidden rounded-none p-0">
      <Sidebar onOpenSettings={() => setSettingsOpen(true)} />
      <ChatPanel />
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </motion.div>
  );
}

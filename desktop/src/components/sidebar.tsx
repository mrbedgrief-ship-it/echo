import { Search, Settings, UserPlus } from "lucide-react";
import { useState } from "react";
import api from "@/lib/api";
import { useChat } from "@/store/use-chat";

export function Sidebar({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { conversations, activeConversationId, openConversation, loadConversations } = useChat();
  const [query, setQuery] = useState("");

  const filtered = conversations.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));

  async function startChat() {
    const email = prompt("Enter user email or username to search:");
    if (!email) return;
    const { data } = await api.get(`/users/search?q=${encodeURIComponent(email)}`);
    if (!data.length) return alert("No user found");
    const convo = await api.post("/conversations/create", { targetUserId: data[0].id });
    await loadConversations();
    await openConversation(convo.data.id);
  }

  return (
    <aside className="flex h-full w-[330px] flex-col border-r border-white/10 bg-panel/70 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Echo</h2>
          <p className="text-xs text-slate-400">Calm communication, real-time.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={startChat} className="rounded-xl bg-soft p-2"><UserPlus className="h-4 w-4" /></button>
          <button onClick={onOpenSettings} className="rounded-xl bg-soft p-2"><Settings className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chats" className="w-full rounded-xl bg-soft py-2 pl-8 pr-3" />
      </div>
      <div className="space-y-2 overflow-auto">
        {filtered.map((c) => (
          <button key={c.conversationId} onClick={() => openConversation(c.conversationId)} className={`w-full rounded-2xl p-3 text-left ${activeConversationId === c.conversationId ? "bg-brand/20" : "bg-soft/70"}`}>
            <p className="font-medium">{c.title}</p>
            <p className="truncate text-xs text-slate-400">{c.lastMessage ?? "No messages yet"}</p>
          </button>
        ))}
      </div>
    </aside>
  );
}

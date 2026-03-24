import { MessageSquarePlus, Search, Settings2 } from "lucide-react";
import { useMemo, useState } from "react";
import api from "@/lib/api";
import { useChat } from "@/store/use-chat";

export function Sidebar({ onOpenSettings }: { onOpenSettings: () => void }) {
  const { conversations, activeConversationId, openConversation, loadConversations } = useChat();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => conversations.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())), [conversations, query]);

  async function startChat() {
    const email = prompt("Search by username or email:");
    if (!email) return;
    const { data } = await api.get(`/users/search?q=${encodeURIComponent(email)}`);
    if (!data.length) return alert("No user found");
    const convo = await api.post("/conversations/create", { targetUserId: data[0].id });
    await loadConversations();
    await openConversation(convo.data.id);
  }

  return (
    <aside className="flex h-full w-[330px] flex-col border-r border-white/10 bg-[#0f1422]/90 p-3">
      <div className="mb-3 flex items-center justify-between px-2 py-2">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Echo</h1>
          <p className="text-xs text-slate-400">A calmer way to stay close.</p>
        </div>
        <div className="flex gap-1">
          <button onClick={startChat} className="rounded-lg bg-white/5 p-2 hover:bg-white/10"><MessageSquarePlus className="h-4 w-4" /></button>
          <button onClick={onOpenSettings} className="rounded-lg bg-white/5 p-2 hover:bg-white/10"><Settings2 className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search conversations" className="w-full rounded-xl border border-white/10 bg-[#141b2d] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-violet-300/40" />
      </div>

      <div className="space-y-1 overflow-y-auto pr-1">
        {filtered.map((c) => (
          <button key={c.conversationId} onClick={() => openConversation(c.conversationId)} className={`group w-full rounded-xl border p-3 text-left transition ${activeConversationId === c.conversationId ? "border-violet-300/35 bg-violet-400/10" : "border-transparent bg-white/0 hover:border-white/10 hover:bg-white/5"}`}>
            <div className="flex items-start justify-between gap-2">
              <p className="truncate text-sm font-medium">{c.title}</p>
              <span className="text-[11px] text-slate-500">{c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}</span>
            </div>
            <p className="mt-1 truncate text-xs text-slate-400">{c.lastMessage ?? "No messages yet"}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-[10px] text-cyan-200">{c.mode}</span>
              {c.unreadCount > 0 && <span className="rounded-full bg-violet-400/30 px-2 py-0.5 text-[10px]">{c.unreadCount}</span>}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

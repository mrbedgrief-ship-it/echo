import { Paperclip, Send, SmilePlus } from "lucide-react";
import { useMemo, useState } from "react";
import { useAuth } from "@/store/use-auth";
import { useChat } from "@/store/use-chat";
import { Mode, Tone } from "@/types";

const modes: Mode[] = ["Pulse", "Deep", "Sync", "Drift", "Quiet"];
const tones: Tone[] = ["warm", "neutral", "urgent", "fragile"];

export function ChatPanel() {
  const { user } = useAuth();
  const { messages, sendMessage, activeConversationId, conversations, typingByConversation } = useChat();
  const [text, setText] = useState("");
  const [tone, setTone] = useState<Tone>("neutral");
  const [mode, setMode] = useState<Mode>("Pulse");

  const active = useMemo(() => conversations.find((c) => c.conversationId === activeConversationId), [conversations, activeConversationId]);

  if (!activeConversationId) {
    return <div className="grid flex-1 place-items-center text-slate-400">Pick a conversation from the left to start chatting.</div>;
  }

  function handleSend() {
    if (!text.trim()) return;
    sendMessage({ text: text.trim(), mode, tone });
    setText("");
  }

  return (
    <section className="flex flex-1 flex-col bg-[#0b101d]/65">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div>
          <p className="text-sm font-semibold">{active?.title ?? "Conversation"}</p>
          <p className="text-xs text-slate-400">{typingByConversation[activeConversationId] ? "Typing…" : "Online"}</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-violet-400/20 px-2 py-1 text-xs">{mode}</span>
          <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs capitalize">{tone}</span>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
        {messages.map((m) => {
          const mine = m.senderId === user?.id;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[72%] rounded-2xl px-4 py-2 shadow-sm ${mine ? "bg-violet-500/30" : "card-glass"}`}>
                <p className="mb-1 text-[10px] text-slate-400">{new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · {m.mode} · {m.tone}</p>
                <p className="text-sm leading-relaxed">{m.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="border-t border-white/10 p-4">
        <div className="mb-2 flex gap-1 overflow-x-auto pb-1">
          {modes.map((m) => <button key={m} onClick={() => setMode(m)} className={`rounded-full px-3 py-1 text-xs ${mode === m ? "bg-violet-300 text-slate-950" : "bg-white/10"}`}>{m}</button>)}
          {tones.map((t) => <button key={t} onClick={() => setTone(t)} className={`rounded-full px-3 py-1 text-xs capitalize ${tone === t ? "bg-cyan-200 text-slate-950" : "bg-white/10"}`}>{t}</button>)}
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#161d30] p-2">
          <button className="rounded-lg p-2 hover:bg-white/10"><SmilePlus className="h-4 w-4" /></button>
          <button className="rounded-lg p-2 hover:bg-white/10"><Paperclip className="h-4 w-4" /></button>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write a message..."
            className="flex-1 bg-transparent px-1 text-sm outline-none"
          />
          <button onClick={handleSend} className="rounded-xl bg-violet-300 p-2 text-slate-950 hover:bg-violet-200"><Send className="h-4 w-4" /></button>
        </div>
      </footer>
    </section>
  );
}

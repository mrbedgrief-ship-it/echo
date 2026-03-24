import { Send, Smile } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/store/use-auth";
import { useChat } from "@/store/use-chat";
import { Mode, Tone } from "@/types";

const modes: Mode[] = ["Pulse", "Deep", "Sync", "Drift", "Quiet"];
const tones: Tone[] = ["warm", "neutral", "urgent", "fragile"];

export function ChatPanel() {
  const { user } = useAuth();
  const { messages, sendMessage, activeConversationId } = useChat();
  const [text, setText] = useState("");
  const [tone, setTone] = useState<Tone>("neutral");
  const [mode, setMode] = useState<Mode>("Pulse");

  if (!activeConversationId) return <div className="grid flex-1 place-items-center text-slate-400">Select a conversation to begin.</div>;

  return (
    <section className="flex flex-1 flex-col">
      <div className="flex-1 space-y-3 overflow-auto p-6">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[70%] rounded-2xl px-4 py-2 ${m.senderId === user?.id ? "ml-auto bg-brand/25" : "bg-soft"}`}>
            <p className="mb-1 text-[11px] text-slate-400">{m.mode} · {m.tone}</p>
            <p>{m.text}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-4">
        <div className="mb-2 flex gap-2 overflow-auto">
          {modes.map((m) => <button key={m} onClick={() => setMode(m)} className={`rounded-full px-3 py-1 text-xs ${mode === m ? "bg-brand text-slate-950" : "bg-soft"}`}>{m}</button>)}
          {tones.map((t) => <button key={t} onClick={() => setTone(t)} className={`rounded-full px-3 py-1 text-xs capitalize ${tone === t ? "bg-aqua text-slate-950" : "bg-soft"}`}>{t}</button>)}
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-soft p-2">
          <button className="rounded-xl p-2"><Smile className="h-4 w-4" /></button>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message..." className="flex-1 bg-transparent outline-none" onKeyDown={(e) => {
            if (e.key === "Enter" && text.trim()) {
              sendMessage({ text: text.trim(), mode, tone });
              setText("");
            }
          }} />
          <button onClick={() => { if (!text.trim()) return; sendMessage({ text: text.trim(), mode, tone }); setText(""); }} className="rounded-xl bg-brand p-2 text-slate-950"><Send className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}

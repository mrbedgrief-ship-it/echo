import { X } from "lucide-react";
import { useAuth } from "@/store/use-auth";

export function SettingsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-20 bg-black/40">
      <div className="absolute right-0 top-0 h-full w-[360px] border-l border-white/10 bg-panel p-5">
        <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-semibold">Settings</h3><button onClick={onClose}><X className="h-4 w-4" /></button></div>
        <div className="space-y-3">
          <div className="rounded-xl bg-soft p-3">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="font-medium">{user?.displayName}</p>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
          <label className="flex items-center justify-between rounded-xl bg-soft p-3 text-sm"><span>Sound notifications</span><input type="checkbox" defaultChecked /></label>
          <label className="flex items-center justify-between rounded-xl bg-soft p-3 text-sm"><span>Desktop alerts</span><input type="checkbox" defaultChecked /></label>
          <button onClick={logout} className="w-full rounded-xl bg-rose-400/80 px-4 py-2 font-medium text-rose-950">Logout</button>
        </div>
      </div>
    </div>
  );
}

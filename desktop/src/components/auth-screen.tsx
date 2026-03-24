import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/store/use-auth";

export function AuthScreen() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", username: "", displayName: "", password: "", identity: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isRegister) await register({ email: form.email, username: form.username, displayName: form.displayName, password: form.password });
      else await login(form.identity, form.password);
    } catch (e) {
      setError("Could not authenticate. Check credentials and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center p-6">
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-glass w-full max-w-md rounded-3xl p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Echo</h1>
        <p className="mb-5 text-sm text-slate-300">A calmer way to stay close.</p>

        <div className="space-y-3">
          {isRegister ? (
            <>
              <input className="w-full rounded-xl border border-white/10 bg-[#131a2d] px-3 py-2" placeholder="Display name" onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
              <input className="w-full rounded-xl border border-white/10 bg-[#131a2d] px-3 py-2" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
              <input className="w-full rounded-xl border border-white/10 bg-[#131a2d] px-3 py-2" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </>
          ) : (
            <input className="w-full rounded-xl border border-white/10 bg-[#131a2d] px-3 py-2" placeholder="Email or username" onChange={(e) => setForm({ ...form, identity: e.target.value })} />
          )}
          <input className="w-full rounded-xl border border-white/10 bg-[#131a2d] px-3 py-2" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>

        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
        <button disabled={busy} className="mt-4 w-full rounded-xl bg-violet-300 px-4 py-2 font-medium text-slate-950 disabled:opacity-50">{busy ? "Please wait..." : isRegister ? "Create account" : "Sign in"}</button>
        <button type="button" className="mt-3 text-sm text-slate-300" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Sign in" : "Need an account? Register"}
        </button>

        <p className="mt-4 text-xs text-slate-400">Demo users after seed: maya@echo.app / leo@echo.app / nora@echo.app (password123)</p>
      </motion.form>
    </div>
  );
}

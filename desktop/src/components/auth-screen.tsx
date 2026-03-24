import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/store/use-auth";

export function AuthScreen() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", username: "", displayName: "", password: "", identity: "" });
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) await register({ email: form.email, username: form.username, displayName: form.displayName, password: form.password });
      else await login(form.identity, form.password);
    } catch (e) {
      setError((e as Error).message || "Authentication failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass w-full max-w-md space-y-4 rounded-3xl border border-white/10 p-6 shadow-soft">
        <div>
          <h1 className="text-3xl font-semibold">Echo</h1>
          <p className="text-sm text-slate-300">A calmer way to stay close.</p>
        </div>
        {isRegister ? (
          <>
            <input className="w-full rounded-xl bg-soft px-3 py-2" placeholder="Display name" onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            <input className="w-full rounded-xl bg-soft px-3 py-2" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <input className="w-full rounded-xl bg-soft px-3 py-2" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </>
        ) : (
          <input className="w-full rounded-xl bg-soft px-3 py-2" placeholder="Email or username" onChange={(e) => setForm({ ...form, identity: e.target.value })} />
        )}
        <input className="w-full rounded-xl bg-soft px-3 py-2" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button className="w-full rounded-xl bg-brand px-4 py-2 font-medium text-slate-950">{isRegister ? "Create account" : "Sign in"}</button>
        <button type="button" className="text-sm text-slate-300" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Sign in" : "Need an account? Register"}
        </button>
      </motion.form>
    </div>
  );
}

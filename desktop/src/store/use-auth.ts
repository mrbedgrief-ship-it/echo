import { create } from "zustand";
import api from "@/lib/api";
import { User } from "@/types";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (identity: string, password: string) => Promise<void>;
  register: (payload: { email: string; username: string; displayName: string; password: string }) => Promise<void>;
  hydrate: () => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem("echo_access_token"),
  loading: false,
  async login(identity, password) {
    const { data } = await api.post("/auth/login", { emailOrUsername: identity, password });
    localStorage.setItem("echo_access_token", data.accessToken);
    localStorage.setItem("echo_refresh_token", data.refreshToken);
    set({ user: data.user, accessToken: data.accessToken });
  },
  async register(payload) {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("echo_access_token", data.accessToken);
    localStorage.setItem("echo_refresh_token", data.refreshToken);
    set({ user: data.user, accessToken: data.accessToken });
  },
  async hydrate() {
    const token = localStorage.getItem("echo_access_token");
    if (!token) return;
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data, accessToken: token });
    } catch {
      localStorage.removeItem("echo_access_token");
      localStorage.removeItem("echo_refresh_token");
      set({ user: null, accessToken: null });
    }
  },
  logout() {
    localStorage.removeItem("echo_access_token");
    localStorage.removeItem("echo_refresh_token");
    set({ user: null, accessToken: null });
  },
}));

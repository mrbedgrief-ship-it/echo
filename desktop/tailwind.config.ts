import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0c0f17",
        panel: "#121726",
        soft: "#1a2033",
        brand: "#8f88ff",
        aqua: "#7dd3fc"
      },
      boxShadow: { soft: "0 10px 28px rgba(0,0,0,.35)" }
    }
  },
  plugins: [],
} satisfies Config;

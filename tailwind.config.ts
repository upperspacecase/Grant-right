import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'EB Garamond'", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      colors: {
        paper: "#F7F4EE",
        ink: "#1A1A1A",
        muted: "#6B6259",
        rule: "#D9D2C5",
        accent: "#7A2E1F",
        sage: "#5B6F5A",
        warn: "#A86A1A"
      },
      letterSpacing: {
        tightish: "-0.01em",
        wider2: "0.18em"
      },
      maxWidth: {
        prose2: "68ch"
      }
    }
  },
  plugins: []
};
export default config;

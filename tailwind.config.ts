import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        surface: "var(--surface)",
        surface2: "var(--surface2)",
        paper: "var(--paper)",
        paperDim: "var(--paperDim)",
        paperDimmer: "var(--paperDimmer)",
        signal: "var(--signal)",
        teal: "var(--teal)",
        line: "var(--line)",
        lineStrong: "var(--lineStrong)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

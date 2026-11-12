import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#101E3A",
          blue: "#2563EB",
          secondary: "#3B82F6",
          light: "#EFF6FF",
          // Backward-compatible scale, aligned to official tokens
          50: "#f0f4fc",
          100: "#dbe4f8",
          200: "#bdcef2",
          300: "#91b0ea",
          400: "#608ee0",
          500: "#3d70d5",
          600: "#2563EB", // Primary Blue (#2563EB)
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#101E3A", // Primary University Navy (#101E3A)
          950: "#0b1528",
        },
        surface: {
          main: "#F7F9FC",
          card: "#FFFFFF",
        },
        typography: {
          primary: "#111827",
          secondary: "#475569",
          muted: "#64748B",
        },
        status: {
          success: "#059669",
          warning: "#D97706",
          danger: "#DC2626",
        },
        accent: {
          gold: "#D97706",
          ochre: "#B45309",
        }
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ],
        heading: [
          "var(--font-heading)",
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "sans-serif"
        ],
      },
      maxWidth: {
        site: "1600px",
        "site-wide": "1680px",
      },
      borderRadius: {
        standard: "12px",
        hero: "16px",
      }
    },
  },
  plugins: [],
};
export default config;

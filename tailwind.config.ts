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
          50: "#f0f4fc",
          100: "#dbe4f8",
          200: "#bdcef2",
          300: "#91b0ea",
          400: "#608ee0",
          500: "#3d70d5",
          600: "#2a55c2",
          700: "#2243a3",
          800: "#1e3784",
          900: "#0f2042", // Primary University Navy
          950: "#09142b",
        },
        accent: {
          gold: "#D97706",
          ochre: "#B45309",
        }
      },
    },
  },
  plugins: [],
};
export default config;

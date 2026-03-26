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
        primary: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
        },
        secondary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
      },
      backgroundImage: {
        gradient: "linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #ede9fe 100%)",
        pink: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
        purple: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

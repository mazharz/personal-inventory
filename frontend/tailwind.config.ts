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
        dark: {
          900: "#282828",
          800: "#3c3836",
          700: "#504945",
          600: "#665c54",
          500: "#7c6f64",
        },
        light: {
          900: "#fbf1c7",
          800: "#ebdbb2",
          700: "#d5c4a1",
          600: "#bdae93",
          500: "#a89984",
        },
        red: {
          900: "#fb4934",
          800: "#cc241d",
          700: "#9d0006",
        },
        green: {
          900: "#b8bb26",
          800: "#98971a",
          700: "#79740e",
        },
        yellow: {
          900: "#fabd2f",
          800: "#d79921",
          700: "#b57614",
        },
        blue: {
          900: "#83a598",
          800: "#458588",
          700: "#076678",
        },
        purple: {
          900: "#d3869b",
          800: "#b16286",
          700: "#8f3f71",
        },
        aqua: {
          900: "#8ec07c",
          800: "#689d6a",
          700: "#427b58",
        },
        orange: {
          900: "#fe8019",
          800: "#d65d0e",
          700: "#af3a03",
        },
      },
    },
  },
  plugins: [],
};
export default config;

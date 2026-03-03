/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // ย้ายมาไว้ตรงนี้
  theme: {
    extend: {
      colors: {
        "primary": "#13ec5b",
        "primary-dark": "#0eb545",
        "background-light": "#f6f8f6",
        "background-dark": "#102216",
        "neutral-surface": "#e7f3eb",
        "neutral-border": "#cfe7d7",
        "neutral-text-main": "#0d1b12",
        "neutral-text-secondary": "#4c9a66",
      },
      fontFamily: {
        display: ["Work Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

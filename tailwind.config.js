/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        synaliz: {
          dark: "#070A0D",
          cyan: "#00DDEB",
          muted: "#A7B0B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

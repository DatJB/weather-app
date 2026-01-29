/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bricola: ["Bricola", "sans-serif"],
      },
      screens: {
        ms: "320px",   // mobile S
        mm: "375px",   // mobile M
        ml: "425px",   // mobile L
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
    },
  },
  plugins: [],
}
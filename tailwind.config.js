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
        ms: "320px",   
        mm: "375px",   
        ml: "425px",   
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        bounceHigh: 'bounceHigh 0.6s infinite',
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bounceHigh: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
        },
      },
    },
  },
  plugins: [],
} 
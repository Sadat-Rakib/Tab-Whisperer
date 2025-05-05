/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-slow': 'fade-in-slow 1.2s ease-out forwards',
        'pulse-slow': 'pulse-slow 4s infinite',
        'backgroundShift': 'backgroundShift 15s ease infinite',
        'moveStars': 'moveStars 60s linear infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in-slow': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        backgroundShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        moveStars: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-1000px 1000px' },
        },
      },
      colors: {
        // Optional: custom color names
        'tw-purple': '#8b5cf6',
        'tw-indigo': '#6366f1',
        'tw-dark': '#0f172a',
      },
    },
  },
  plugins: [],
}

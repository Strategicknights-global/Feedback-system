/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // === ADD FONT FAMILY ===
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      // === ADD KEYFRAMES & ANIMATIONS ===
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'background-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'background-zoom': 'background-zoom 20s ease-out forwards',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
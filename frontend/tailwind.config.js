/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#090a0f',
        panel: '#12131c',
        borderSubtle: '#1e2130',
        accentOrange: '#ff7a18',
        accentCyan: '#00f2fe',
        accentEmerald: '#00e676',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
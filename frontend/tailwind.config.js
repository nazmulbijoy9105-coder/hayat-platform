/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hayat-bg': '#0F172A',
        'hayat-panel': '#1E293B',
        'hayat-accent': '#3B82F6',
        'hayat-text': '#E2E8F0'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

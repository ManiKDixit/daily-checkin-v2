/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      colors: {
        peach: '#FF8C69',
        gold: '#F5A623',
        mint: '#52C9A0',
        sky: '#60AEFF',
        lavender: '#A78BFA',
        'warm-white': '#FEFDF9',
        'warm-gray': '#F7F5F0',
      },
    },
  },
  plugins: [],
}

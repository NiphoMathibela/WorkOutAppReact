/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        purple: '#7C4DFF',
        'purple-dark': '#6430E8',
        'purple-light': '#E0D7FF',
        background: '#F3F6FB',
        text: '#1A1A1A',
        'text-secondary': '#6B7280',
        link: '#4A7BF7',
      }
    },
  },
  plugins: [],
}


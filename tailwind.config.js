/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        purple: '#7B3FF2',
        'purple-dark': '#6430E8',
        'purple-light': '#E0D7FF',
        background: '#F5F7FA',
        text: '#1A1A1A',
        'text-secondary': '#6B7280',
        link: '#4A7BF7',
      }
    },
  },
  plugins: [],
}


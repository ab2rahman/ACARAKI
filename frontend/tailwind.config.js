/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'acaraki-beige': '#E8DCC8',
        'acaraki-beige-light': '#F5F0E6',
        'acaraki-brown': '#5C4033',
        'acaraki-brown-dark': '#3C2A20',
        'acaraki-gold': '#D4A84B',
        'acaraki-green': '#4A7C59',
        'acaraki-green-light': '#7BA37B',
        'acaraki-cream': '#FAF7F2',
      },
      fontFamily: {
        'museo': ['Museo', 'sans-serif'],
        'display': ['"SS Nickson One"', 'cursive'],
        'global': ['var(--font-be-vietnam-pro)'],
        'archivo': ['var(--font-archivo)'],
        'inter': ['var(--font-inter)'],
        'manrope': ['var(--font-manrope)'],
      },
    },
  },
  plugins: [],
}


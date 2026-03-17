/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        'global': ['var(--font-be-vietnam-pro)'],
        'archivo': ['var(--font-archivo)'],
        'inter': ['var(--font-inter)'],
        'manrope': ['var(--font-manrope)'],
      },
    },
  },
  plugins: [],
}


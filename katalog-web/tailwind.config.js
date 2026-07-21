/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': '#0F0F10',
        'charcoal': '#18181B',
        'gold-primary': '#D4AF37',
        'gold-light': '#FCF6BA',
        'gold-dark': '#B38728',
        'ivory': '#FAFAFA',
        'muted-grey': '#A0A0AB',
      },
      fontFamily: {
        'serif-luxury': ['Cinzel', 'Playfair Display', 'serif'],
        'sans-luxury': ['Montserrat', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 4px 20px rgba(212, 175, 55, 0.25)',
      },
      borderColor: {
        'gold-border': 'rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
}

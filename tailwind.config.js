const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        dark: colors.neutral,
        "dark-accent": colors.amber
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "components/**/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "app.vue",
    "plugins/**/*.{js,ts}",
    "nuxt.config.{js,ts}"
  ],
  theme: {
    fontFamily: {
      display: ["Inter", "system-ui", "sans-serif"],
      body: ["Inter", "system-ui", "sans-serif"]
    }
  },
  daisyui: {
    themes: [
      "halloween",
      {
        torrust: {
          primary: "#f28c18",
          "primary-content": "#fff7ee",
          secondary: "#187EF2",
          accent: "#51a800",
          neutral: "#1b1d1d",
          "base-100": "#212121",
          info: "#2563eb",
          success: "#16a34a",
          warning: "#d97706",
          error: "#dc2626"
        },
        torrustlight: {
          primary: "#f28c18",
          "primary-content": "#ffffff",
          secondary: "#187EF2",
          accent: "#51a800",
          neutral: "#3b424e",
          "base-100": "#ffffff",
          base: "#ffffff",
          info: "#2563eb",
          success: "#16a34a",
          warning: "#d97706",
          error: "#dc2626",
          "neutral-content": "#000000"
        }
      }
    ]
  },
  darkMode: "class",
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography")
  ]
};

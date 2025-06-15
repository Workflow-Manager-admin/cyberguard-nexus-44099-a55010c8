/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // use .dark class to enable dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00ffff",
        secondary: "#39ff14",
        accent: "#8a2be2",
      },
    },
  },
  plugins: [],
}

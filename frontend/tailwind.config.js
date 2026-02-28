/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#12121A',
        card: '#1E1E2C',
        primary: '#FF3366',
        secondary: '#00D68F',
        sensual: '#A200FF'
      }
    },
  },
  plugins: [],
}

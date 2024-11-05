/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"PT Sans"', 'sans-serif']
      },
      colors: {
        bixcolor: {
          default: "#074048",
          light: "#006664",
        },
      },
    },
  },
  plugins: [],
}
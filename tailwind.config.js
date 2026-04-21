/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'water-blue': '#0284c7',
        'water-dark': '#075985',
        'nature-green': '#16a34a',
        'nature-light': '#dcfce7',
      },
    },
  },
  plugins: [],
}

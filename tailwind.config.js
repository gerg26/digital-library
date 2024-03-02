/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '280px',
        'xs': '320px'
      }
    },
  },
  plugins: [],
}


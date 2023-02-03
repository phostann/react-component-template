/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary-color) / <alpha-value>)'
      }
    }
  },
  variants: {
    extend: {}
  },
  corePlugins: {
    preflight: false
  },
  important: true,
  plugins: []
}

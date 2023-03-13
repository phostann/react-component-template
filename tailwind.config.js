/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(var(--primary-color) / <alpha-value>)',
        secondary: 'rgba(var(--secondary-color) / <alpha-value>)',
        tip: 'rgba(var(--tip-color) / <alpha-value>)',
        success: 'rgba(var(--success-color) / <alpha-value>)',
        warn: 'rgba(var(--warn-color) / <alpha-value>)',
        error: 'rgba(var(--error-color) / <alpha-value>)',
        info: 'rgba(var(--info-color) / <alpha-value>)',
        black: 'rgba(var(--black-color) / <alpha-value>)',
        'black-4': 'rgba(var(--black-color) / 0.04)',
        'black-8': 'rgba(var(--black-color) / 0.08)',
        'black-16': 'rgba(var(--black-color) / 0.16)',
        'black-24': 'rgba(var(--black-color) / 0.24)',
        'black-48': 'rgba(var(--black-color) / 0.48)',
        'black-80': 'rgba(var(--black-color) / 0.80)',
        white: 'rgba(var(--white-color) / <alpha-value>)',
        'white-8': 'rgba(var(--white-color) / 0.08)',
        'white-16': 'rgba(var(--white-color) / 0.16)',
        'white-24': 'rgba(var(--white-color) / 0.24)',
        'white-32': 'rgba(var(--white-color) / 0.32)',
        'white-64': 'rgba(var(--white-color) / 0.64)',
        'white-100': 'rgba(var(--white-color) / 0.100)'
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

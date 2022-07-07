/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Manrope', ...fontFamily.sans],
      },
      colors: {
        slate: colors.slate,
        white: colors.white,
        gray: colors.gray,
        primary: {
          100: colors.blue[100],
          200: colors.blue[200],
          300: colors.blue[300],
          400: colors.blue[400],
          500: colors.blue[500],
          600: colors.blue[600],
          700: colors.blue[700],
          800: colors.blue[800],
          900: colors.blue[900],
          50: colors.blue[50],
        },
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

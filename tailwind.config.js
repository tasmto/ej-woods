/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Manrope', ...fontFamily.sans],
      },
      colors: {
        slate: colors.slate,
        white: colors.white,
        black: colors.black,
        gray: colors.gray,
        primary: {
          100: '#8D7F7F',
          200: '#585252',
          300: '#414142',
          400: '#2B2828',
          500: '#1e1e1e',
          600: '#171717',
          700: '#131313',
          800: '#0E0E0E',
          900: '#000000',
          50: '#B5A7A7',
          20: '#DBDBDB',
          10: '#F1F1F1',
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
}

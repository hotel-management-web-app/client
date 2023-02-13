/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        container: '1436px',
      },
      maxWidth: {
        container: '1436px',
      },
      colors: {
        'dark-gray': '#202020',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};

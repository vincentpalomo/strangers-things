/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'synthwave',
      'cupcake',
      'cyberpunk',
      'pastel',
      'fantasy',
      'night',
      'retro',
      'aqua',
      'dracula',
      'light',
    ],
  },
};

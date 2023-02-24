/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens:{
        '2xs': '320px',
        'xs': '480px',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')]
}

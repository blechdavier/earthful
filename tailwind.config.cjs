/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      screens:{
        '2xs': '320px',
        'xs': '480px',
      },
      backgroundImage: {
        'gold': "linear-gradient(-45deg, rgba(169,153,30,1) 0%, rgba(235,213,8,1) 42%, rgba(199,194,5,1) 100%)",
        'silver': "linear-gradient(-45deg, rgba(192,192,192,1) 0%, rgba(235,235,235,1) 42%, rgba(199,199,199,1) 100%)",
        'bronze': "linear-gradient(-45deg, rgba(205,127,50,1) 0%, rgba(255,215,0,1) 42%, rgba(205,127,50,1) 100%)",
      }
    },
  },
  plugins: [require('@tailwindcss/forms')]
}

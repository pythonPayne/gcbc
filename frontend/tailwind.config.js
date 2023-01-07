/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gcbc-emblem': "url('/src/images/Emblem_Blue.png')",           
      }
    },
  },
  plugins: [
    'gatsby-plugin-postcss'
  ],
}

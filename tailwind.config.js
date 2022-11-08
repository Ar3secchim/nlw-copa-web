/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: 'Roboto, sans-serif'
      },
      backgroundImage:{
        app: 'url(/app-bg.png)'
      },
    },
    colors:{
      gray: {
        900: '#121214',
        500: '#202024',
        300: '#323238'
      },
      white:{
        900: '#ffff'
      },
      green:{
        500: '#129E57'
      },
      yellow:{
        300: '#F7DD43'
      }
    }
  },
  plugins: [],
}

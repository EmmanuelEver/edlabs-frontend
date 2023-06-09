/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        supermax  : 11000,
        max       : 10000,
        modal     : 9000, 
        overlay   : 8000,
        dropdown  : 7000,
        header    : 6000,
        footer    : 5000
      },
      colors: {
        light: {
          "100": "#ffffff",
          "200": "#eff2f7",
          "300": "#d3dce6",
          "400": "#f5f7fd"
        },
        blue: {
          "100": "#c5e5f3",
          "200": "#828fa3"
        },
        accentColor: {
          "100": "#00d8d6",
          "200": "#e9e5dd"
        },
        dark: {
          "100": "#000000",
          header: "#313131",
          subHeader: "#616161",
          body: "#333333"
        }
      },
      textColor: {
        header: "#313131",
        subHeader: "#616161",
        body: "#333333"
      },
      fontFamily: {
        sans: 'Noto Sans JP',
      },
    },
  },
  plugins: [],
}

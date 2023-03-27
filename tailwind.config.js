/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          "100": "#ffffff",
          "200": "#eff2f7",
          "300": "#d3dce6",
          "400": "#f5f7fd"
        },
        blue: {
          "100": "#c5e5f3"
        },
        accentColor: {
          "100": "#00d8d6"
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

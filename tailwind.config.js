const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...colors,
      gray: colors.blueGray,
      blue: {
        100: "#F2FAFF",
        200: "#B4C7D5",
        300: "#6994AE",
        400: "#4B7392",
        500: "#375A77",
        600: "#29415A",
        700: "#1D2437",
      },
      yellow: {
        200: "#FFE7D1",
        300: "#C8B4A8",
        400: "#C8AB90",
        500: "#A88C77",
        600: "#998075",
        700: "#4C4441",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

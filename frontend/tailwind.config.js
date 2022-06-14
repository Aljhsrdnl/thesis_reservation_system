module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'transparent': 'transparent',
      'green': {
        100: "#DCECD8",
        200: "#C4DFBE",
        300: "#A6CF9E",
        400: "#D8E9A8",
        600: "#4E9F3D",
        800: "#1E5128",
        1000: "#191A19"
      },
      'gray': {
        100: "#EBEBEB",
        200: "#DEDEDE",
        300: "#CDCDCD",
        400: "#BCBCBC",
        500: "#ACACAC",
        600: "#9B9B9B",
        700: "#818181",
        800: "#676767",
        900: "#4E4E4E"
      },
      'warning': '#BC123C',
      'body-background': '#F6F9EF',
      'white': '#ffffff'
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

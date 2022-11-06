module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      darkGreen: {
        200: "#c7eace",
      },
      green: {
        100: "#DCECD8",
        200: "#C4DFBE",
        300: "#A6CF9E",
        400: "#D8E9A8",
        600: "#4E9F3D",
        800: "#1E5128",
        1000: "#191A19",
      },
      gray: {
        50: "#F7F7F7",
        100: "#EBEBEB",
        200: "#DEDEDE",
        300: "#CDCDCD",
        400: "#BCBCBC",
        500: "#ACACAC",
        600: "#9B9B9B",
        700: "#818181",
        800: "#676767",
        900: "#4E4E4E",
      },
      primary: { 200: "#84B7FC", 500: "#0349A8", 600: "#02377F" },
      secondary: { 300: "#FDD54A", 500: "#FAC203" },
      warning: "#BC123C",
      "body-background": "#F6F9EF",
      white: "#ffffff",
      "warning-background": "#f8d7da",
      "warning-border": "#f5c6cb",
      success: {
        100: "#d4edda",
        200: "#155724",
      },
      yellow: {
        100: "#fff3cd",
        200: "#856404",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

module.exports = {
  purge: false,
  darkMode: false,
  theme: {
    lineClamp: {
      1: 1,
      2: 2,
      3: 3
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("tailwindcss-line-clamp")]
};

module.exports = {
  purge: false,
  darkMode: "media",
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

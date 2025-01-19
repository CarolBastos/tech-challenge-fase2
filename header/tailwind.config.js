module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
      'card-pattern': "url('/public/images/background.png')",
    }},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

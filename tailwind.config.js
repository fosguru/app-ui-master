module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem',
      },
    },
  },
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.{js,ts}',
    'nuxt.config.{js,ts}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

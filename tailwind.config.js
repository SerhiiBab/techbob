// tailwind.config.js
const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: { fontSize: theme('fontSize.3xl') },
            h2: { fontSize: theme('fontSize.2xl') },
            h3: { fontSize: theme('fontSize-xl') },
            ul: { listStyleType: 'disc', paddingLeft: theme('spacing.6') },
            ol: { listStyleType: 'decimal', paddingLeft: theme('spacing.6') },
            'ul li::marker': { color: theme('colors.gray.500') },
            'ol li::marker': { color: theme('colors.gray.500') },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

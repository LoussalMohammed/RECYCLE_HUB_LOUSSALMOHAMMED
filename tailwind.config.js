module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': 'var(--primary-green)',
        'secondary-green': 'var(--secondary-green)',
        'primary-b': 'var(--primary-b)',
        'secondary-b': 'var(--secondary-b)',
        'input-color' : 'var(--input-color)'
      },
    },
  },
  plugins: [],
}
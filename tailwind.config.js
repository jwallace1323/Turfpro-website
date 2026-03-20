/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:        '#1565C0',
          'blue-dark': '#0D47A1',
          'blue-mid':  '#1976D2',
          'blue-light':'#42A5F5',
          green:        '#2E7D32',
          'green-dark': '#1B5E20',
          'green-light':'#43A047',
          red:          '#C62828',
          'red-light':  '#E53935',
          dark:         '#0F1923',
          'gray-bg':    '#F4F7FB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D2E6E 0%, #0D47A1 40%, #1B5E20 100%)',
        'stats-gradient': 'linear-gradient(90deg, #0D47A1 0%, #1565C0 100%)',
      },
    },
  },
  plugins: [],
};

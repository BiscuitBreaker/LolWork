/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['SC Prosper Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'sc-prosper': ['SC Prosper Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'sc-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#38D200',  // Primary SC Green from logo
          600: '#2fb800',
          700: '#259400',
          800: '#1f7600',
          900: '#1a5e00',
          950: '#0d3f00',
        },
        'sc-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#0473EA',  // Primary SC Blue from logo
          700: '#0369d9',
          800: '#0356c7',
          900: '#0951a5',
          950: '#062e73',
        },
      },
    },
  },
  plugins: [],
}
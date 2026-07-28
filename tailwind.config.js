/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        bounce: 'bounce 1.5s infinite',
      },
      /* Deliberate reading measure for long-form case-study prose */
      maxWidth: {
        measure: '68ch',
      },
      /* Display tracking for large headings set in Space Grotesk */
      letterSpacing: {
        display: '-0.02em',
      },
    },
  },
  plugins: [],
};
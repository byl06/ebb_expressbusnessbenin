/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#10243A', 800: '#183D5B' },
        gold: { DEFAULT: '#C7A66A', dark: '#8A6B2F' },
        mist: '#F5F7FA',
        ink: '#1B2A3A',
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,36,58,.05), 0 8px 24px -12px rgba(16,36,58,.14)',
        lift: '0 2px 4px rgba(16,36,58,.06), 0 18px 36px -16px rgba(16,36,58,.22)',
      },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
}

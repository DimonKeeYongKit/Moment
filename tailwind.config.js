module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 自定义颜色
        'dark-bg': '#000000',
        'light-bg': '#FFFFFF',
        'gold': '#FFD700',
        'primary-blue': '#007BFF'
      },
      // 自定义间距
      spacing: {
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};
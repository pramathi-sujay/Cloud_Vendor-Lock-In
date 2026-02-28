/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          950: '#020817',
          900: '#0f172a',
          800: '#1e293b',
          700: '#273344',
          600: '#334155',
        },
        accent: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
          light: '#818cf8',
          purple: '#c084fc',
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #6366f1, #c084fc)',
        'gradient-aws': 'linear-gradient(135deg, #ff9900, #ffba49)',
        'gradient-gcp': 'linear-gradient(135deg, #4285f4, #0f9d58)',
        'gradient-azure': 'linear-gradient(135deg, #0089d6, #0050ef)',
        'gradient-card': 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(192,132,252,0.05))',
      },
      boxShadow: {
        'card': '0 4px 24px 0 rgba(0,0,0,0.3)',
        'glow': '0 0 20px rgba(99,102,241,0.3)',
        'glow-green': '0 0 16px rgba(34,197,94,0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

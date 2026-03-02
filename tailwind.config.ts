import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAFA',
        black: '#171717',
        gray: {
          DEFAULT: '#6B7280',
          light: '#9CA3AF',
          border: '#E5E7EB',
        },
        blue: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'SF Mono', 'monospace'],
      },
      fontSize: {
        xs: ['11px', '1.5'],
        sm: ['13px', '1.6'],
        base: ['14px', '1.7'],
        lg: ['16px', '1.6'],
      },
      animation: {
        'fade': 'fade 0.3s ease-out',
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

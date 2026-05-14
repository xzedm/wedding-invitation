import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          cream: '#F5EFE6',
          gold: '#C9A882',
          dark: '#3A2E22',
          brown: '#7A6250',
          brownLight: '#8A7260',
          brownMuted: '#5C4A35',
          brownAccent: '#A08060',
          brownLight2: '#D9C5AF',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['11px', { letterSpacing: '0.32em' }],
        label: ['10px', { letterSpacing: '0.34em' }],
        labelSm: ['9px', { letterSpacing: '0.3em' }],
        nameDiv: ['11px', { letterSpacing: '0.28em' }],
      },
      animation: {
        fadeIn: 'fadeIn 1.2s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

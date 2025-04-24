/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './Components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      keyframes: {
        logoSpin: {
          '0%': { transform: 'rotate(-45deg)' },
          '100%': { transform: 'rotate(315deg)' },
        },
        pulseColorScale: {
          '0%, 100%': {
            transform: 'scale(1)',
            color: '#000000',
          },
          '50%': {
            transform: 'scale(0.8)',
            color: '#a3a3a3',
          },
        },
      },
      animation: {
        logoSpin: 'logoSpin 3s linear infinite',
        pulseColorScale: 'pulseColorScale 2s ease-in-out infinite',
      },
    }
    
    
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './Components/**/*.{js,ts,jsx,tsx}','./public/**/*.html'],
  theme: {
    extend: {
      keyframes: {
        popIn: {
          '0%, 1%': { transform: 'scale(0)', opacity: '0' },
          '10%': { transform: 'scale(1)', opacity: '1' },
          '40%, 70%': { transform: 'scale(1)', opacity: '1' },
          '71%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        spinShrink: {
          '0%, 40%': { transform: 'rotate(-45deg) scale(1)' },
          '70%': { transform: 'rotate(315deg) scale(0)' },
          '71%, 100%': { transform: 'rotate(-45deg) scale(0)' },
        },
      },
      animation: {
        popIn: 'popIn 3s infinite',
        spinShrink: 'spinShrink 3s infinite',
      },
    },
  },
  plugins: [],
};

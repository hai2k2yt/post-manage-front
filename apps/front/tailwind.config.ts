/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': {
            transform: 'translate(0px, 0px);'
          },
          '25%': {
            transform: 'translate(-2px, 0px);'
          },
          '75%': {
            transform: 'translate(2px, 0px);'
          }
        },
        animation: {
          shake: 'shake 0.4s ease-in-out'
        }
      }
    },
  },
  plugins: [],
};

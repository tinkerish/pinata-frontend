/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file types
  ],
  theme: {
    extend: {
      keyframes: {
        customPulse: {
            '0%': { transform: 'scale(0.8)' },
            '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        customPulse: 'customPulse 1s infinite linear alternate',
        customAnimatePulse: "custom-pulse 2s ease-in-out ", /* 1s duration, ease-in-out easing, 1 iteration */
        
      },
      
    },
  },
  plugins: [],
}

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-in-out',
      },
    },
    screens: {
      sm: '640px', // Small devices
      md: '768px', // Medium devices
      lg: '1024px', // Large devices
      xl: '1280px', // Extra large devices
    },
  },
  plugins: [],
};

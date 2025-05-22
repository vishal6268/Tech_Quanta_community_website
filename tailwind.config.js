export default {
  darkMode: "class",
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        exo2: ['"Exo 2"', 'sans-serif'],
        mono: ['"Fira Mono"', 'monospace'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'], // added for loader
      },
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A',
        'tech-green': '#2ECC71',           // for glow-pulse
        'tech-blue-light': '#00bfff30',    // for shine-ring
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.7 },
          '50%': { transform: 'scale(1.15)', opacity: 1 },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

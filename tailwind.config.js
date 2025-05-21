export default {
    darkMode: "class",
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}', // Adjust the paths according to your project structure
    ],
    theme: {
      extend: {
         fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        exo2: ['"Exo 2"', 'sans-serif'],
        mono: ['"Fira Mono"', 'monospace'], // or your monospace of choice
      },
        // You can extend the default Tailwind CSS theme here
        colors: {
          primary: '#1DA1F2',
          secondary: '#14171A',
        },
        backgroundImage: {
        'custom-bg': "url('/public/background.gif')",
        // or remote URL:
        // 'custom-bg': "url('https://example.com/image.jpg')",
      },
      },
    },
    plugins: [
      // Add any Tailwind CSS plugins here
    ],
  };
export default {
    content: [
      './src/**/*.{html,js,jsx,ts,tsx}', // Adjust the paths according to your project structure
    ],
    theme: {
      extend: {
         fontFamily: {
        firacode: ['"Fira Code"', 'monospace'],
      },
        // You can extend the default Tailwind CSS theme here
        colors: {
          primary: '#1DA1F2',
          secondary: '#14171A',
        },
      },
    },
    plugins: [
      // Add any Tailwind CSS plugins here
    ],
  };
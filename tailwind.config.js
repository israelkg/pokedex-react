export default {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    safelist: [
      'dark:bg-amber-600', // classes dark que vc usa
      'dark:bg-black',     // coloca aqui todas as dark que precisar
      'dark:bg-gray-700',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
export default {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      mob: '480px',
      tab: '768px',
    },
    extend: {
      colors: {
        primaryText: '#ebfffe',
        contentText: '#3c51e6',
        textLink: '#fffefe',
        activeLink: '#acf2f2',
        bgAside: '#f7373a',
      },
      fontFamily: {
        main: ['Inter'],
      },
    },
  },

  plugins: [],
};

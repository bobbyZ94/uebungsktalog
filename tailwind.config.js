/* eslint-disable */
module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
      'auto': 'auto',
      },
      zIndex: {
        '-10': '-10',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'white',
            'ol > li::before': {
              color: 'white',
            },
            'ul > li::before': {
              backgroundColor: 'white',
            },
            'ol > li > *:last-child': {
              'margin-bottom': 0,
            },
            'ul > li > *:last-child': {
              'margin-bottom': 0,
            },
            'ol > li > *:first-child': {
              'margin-top': 0,
            },
            'ul > li > *:first-child': {
              'margin-top': 0,
            },
            'ul > li': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'ol > li': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'ul': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'p:empty': { 
              display: 'none',
            },
          },
        },
        sm: {
          css: {
            'ol > li > *:last-child': {
              'margin-bottom': 0,
            },
            'ul > li > *:last-child': {
              'margin-bottom': 0,
            },
            'ol > li > *:first-child': {
              'margin-top': 0,
            },
            'ul > li > *:first-child': {
              'margin-top': 0,
            },
            'ul > li': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'ol > li': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'ul': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'p:empty': { 
              display: 'none',
            },
          }
        },
        lg: {
          css: {
            'ol > li > *:last-child': {
              'margin-bottom': 0,
            },
            'ul > li > *:last-child': {
              'margin-bottom': 0,
            },
            'ol > li > *:first-child': {
              'margin-top': 0,
            },
            'ul > li > *:first-child': {
              'margin-top': 0,
            },
            'ul > li': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'ol > li': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'ul': {
              'margin-top': 0,
              'margin-bottom': 0,
            },
            'p:empty': { 
              display: 'none',
            },
          }
        }
      },
    },
    screens: {
      'no': '0px',
      'xs': '300px',
      'ss': '400px',
      'mm': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
};

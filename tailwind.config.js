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
            p: {
              'margin-top': '0.25rem',
              'margin-bottom': '0.25rem',
            },
            li: {
              'margin-top': '0.25rem',
              'margin-bottom': '0.25rem',
            }
          },
        },
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
